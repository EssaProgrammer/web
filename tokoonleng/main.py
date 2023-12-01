import http.client
import json

conn = http.client.HTTPSConnection("api.rajaongkir.com")

headers = { 'key': "32e3bbc15981616136b1fe8ff0fc6c50" }

conn.request("GET", "/starter/city", headers=headers)

res = conn.getresponse()
data = res.read()

data = data.decode("utf-8")
data = json.loads(data)

city_id = []
city_name = []
knp_loding_teros = "haghag"

for i in data["rajaongkir"]["results"]:
    city_id.append(i["city_id"])
    city_name.append(i["city_name"])

haghag = input("masukan kota asal anda: ")
ohhadfsfd = input("masukan kota tujuan anda")
haghag = haghag.split(" ")
dontwakemeup = ""
lololol = 0
for i in haghag:
    if lololol == 0:
        dontwakemeup = i.capitalize()
    else:
        dontwakemeup = dontwakemeup + " " + i.capitalize()
    lololol = lololol + 1

