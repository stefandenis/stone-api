import time
import requests
from bs4 import BeautifulSoup
import os
from selenium import webdriver
import yaml

url = "https://www.stonemania.ro/pietre-semipretioase/"

driver = webdriver.Chrome("chromedriver.exe")

driver.get(url)
time.sleep(5 )
page = driver.page_source
soup = BeautifulSoup(page, "html.parser")
click = 0
next_button = driver.find_element_by_class_name("owl-next")
owl_items = soup.find_all('div', class_="owl-item active")
items_per_slide = len(owl_items)
stone_number = 0
stone_mapping = {}
while click < 140:

    for owl_item in owl_items:
        img = owl_item.find_all("img")[0]["src"]
        img = img.replace(".webp", "")
        if img == "./design/themes/vivashop/media/images/vs-empty.png":
            print("skipping, no url")
            continue
        extension = img.split('.')[-1]
        with open("images/stone" + str(stone_number) + "." + extension, "wb") as handle:
            response = requests.get(img)
            handle.write(response.content)
        stone_name = owl_item.find_all("span")[1].text
        stone_mapping["stone" + str(stone_number)] = { "name": stone_name, "image_extension": extension}
        stone_number+=1
    print(owl_items)

    click += 5
    for i in range(5):
        next_button.click()
    time.sleep(3)
    page = driver.page_source
    soup = BeautifulSoup(page, "html.parser")
    owl_items = soup.find_all('div', class_="owl-item active")

with open('stones.yaml', 'w') as file:
    yaml.dump(stone_mapping, file)