from django.http import HttpResponse, JsonResponse
from .models import Drug, Patient
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from main.settings import DEBUG


def pprint(*args, **kwargs):
    if DEBUG:
        print(*args, **kwargs)


def jsonfun(request):
    if request.method == "POST":
        try:
            element = Drug.objects.get(pk=int(request.POST["id"]))
            pprint("Editing the element", element)
            getData = request.POST
            element.brand_name = getData["brandName"]
            element.generic_name = getData["genericList"]
            element.price = int(getData["price"])
            element.expiry_date = getData["expiryDate"]
            element.quantity = int(getData["quantity"])
            element.description = getData["description"]
            element.save()
        except Exception as e:
            pprint("creating the element", e)
            getData = request.POST
            newDrug = Drug(
                brand_name=getData["brandName"],
                generic_name=getData["genericList"],
                # price=getData["price"],
                # expiry_date=getData["expiryDate"],
                # quantity=getData["quantity"],
                description=getData["description"],
            )
        finally:
            return JsonResponse({"changeSaved": True})
    elif request.method == "GET":
        data = Drug.objects.all()
        myJsonData = {"drugDb": []}
        for item in data:
            myJsonData["drugDb"].append(
                {
                    "id": item.id,
                    "brandName": item.brand_name,
                    "genericList": item.generic_name,
                    "price": item.price,
                    "expiryDate": str(item.expiry_date)[:10],
                    "quantity": item.quantity,
                    "description": item.description,
                    "imageUrl": "static/img/panadol.jpg",
                    "_DateCreated": item.date_created,
                }
            )
        return JsonResponse(myJsonData)


@csrf_exempt
def tostock(request):
    # pprint(request.POST)
    # {'id': ['7099'], 'brandName': ['a'], 'genericList': [''],
    # 'price': ['0'], 'expiryDate': ['2023-05-26'], 'quantity': ['0'],
    # 'description': [''], 'imageUrl': ['img/panadol.jpg'],
    # '_DateCreated': ['1685138427446'], 'delete': ['false'], 'new': ['true']}
    getData = request.POST
    if getData["new"] == "true":
        newDrug = Drug(
            id=getData["id"],
            brand_name=getData["brandName"],
            generic_name=getData["genericList"],
            price=getData["price"],
            expiry_date=getData["expiryDate"],
            quantity=getData["quantity"],
            description=getData["description"],
        )
        pprint(newDrug)
        newDrug.save()
    elif getData["delete"] == "true":
        delDrug = Drug.objects.get(id=getData["id"])
        pprint(delDrug)
        delDrug.delete()
    else:
        editDrug = Drug.objects.get(id=getData["id"])
        editDrug.brand_name = getData["brandName"]
        editDrug.generic_name = getData["genericList"]
        editDrug.price = getData["price"]
        editDrug.expiry_date = getData["expiryDate"]
        editDrug.quantity = getData["quantity"]
        editDrug.description = getData["description"]
        editDrug.save()
        pprint(editDrug)
    return HttpResponse("HI")


@login_required
def manage(request, path, model, id, order):
    pprint(order)
    models = {"drugDb": Drug, "patientDb": Patient}
    fields = {
        "drugDb": {
            "id": ["int", "GET", "DELETE", id],
            "brand_name": ["str", "GET", "POST"],
            "generic_name": ["str", "GET", "POST"],
            "price": ["int", "GET", "POST"],
            "expiry_date": ["date", "GET", "POST"],
            "quantity": ["int", "GET", "POST"],
            "description": ["str", "GET", "POST"],
            "image": ["image", "GET", "POST"],
            "date_created": ["int", "GET"],
            "last_modfied": ["int", "GET"],
        },
        "patientDb": {
            "id": ["int", "GET", "DELETE", id],
            "username": ["str", "GET", "POST"],
            "first_name": ["str", "GET", "POST"],
            "middle_name": ["str", "GET", "POST"],
            "last_name": ["str", "GET", "POST"],
            "email": ["str", "GET", "POST"],
            "current_status": ["str", "GET", "POST"],
            "image": ["image", "GET", "POST"],
        },
    }
    if request.method == "GET":
        if model == None:
            return JsonResponse(convertModelsToJson(fields, models))
        return JsonResponse(convertModelToJson(fields, models, model, order))
    elif request.method == "DELETE":
        pprint("Deleting the element with id = " + id)
        for key, type in fields[model].items():
            if "DELETE" in type:
                models[model].objects.get(**{key: type[-1]}).delete()
        return JsonResponse({"action": f"Deleted Element with id {type[-1]}"})
    else:
        get_data = request.POST
        get_files = request.FILES
        if id == None:
            pprint("Creating a new element")
            new_model = models[model]()
            for key, type in fields[model].items():
                if "POST" in type:
                    updateModel(new_model, key, type, get_files, get_data)
            new_model.save()
            return JsonResponse({"action": "New Element Created"})
        else:
            pprint("altering element with id = ", id)
            edit_model = models[model].objects.get(id=id)
            for key, type in fields[model].items():
                if "POST" in type:
                    updateModel(edit_model, key, type, get_files, get_data)
            edit_model.save()
            return JsonResponse({"action": f"Updated Element with id {id}"})


def convertModelsToJson(fields, models):
    myJsonData = {}
    for model in fields.keys():
        data = models[model].objects.all()
        myJsonData[model] = []
        for i, item in enumerate(data):
            myJsonData[model].append({})
            for key, type in fields[model].items():
                if "GET" in type:
                    if type[0] == "image":
                        if getattr(item, key) != "" and getattr(item, key) != None:
                            myJsonData[model][i][key] = getattr(item, key).url[9:]
                        else:
                            myJsonData[model][i][key] = ""
                    else:
                        myJsonData[model][i][key] = getattr(item, key)
    return myJsonData


def convertModelToJson(fields, models, model, order):
    if order == None:
        order = "id"
    pprint(order)
    data = models[model].objects.all().order_by(order)
    myJsonData = {model: []}
    for i, item in enumerate(data):
        myJsonData[model].append({})
        for key, type in fields[model].items():
            if "GET" in type:
                if type[0] == "image":
                    if getattr(item, key) != "" and getattr(item, key) != None:
                        myJsonData[model][i][key] = getattr(item, key).url[9:]
                    else:
                        myJsonData[model][i][key] = ""
                else:
                    myJsonData[model][i][key] = getattr(item, key)
    return myJsonData


def updateModel(model, key, type, get_files, get_data):
    if type[0] == "image":
        if len(get_files):
            setattr(model, key, get_files[key])
    elif type[0] == "int":
        if get_data[key] != "":
            setattr(model, key, get_data[key])
        else:
            setattr(model, key, 0)
    elif type[0] == "date":
        if get_data[key] != "":
            setattr(model, key, get_data[key])
        else:
            setattr(model, key, timezone.now())
    else:
        setattr(model, key, get_data[key])
