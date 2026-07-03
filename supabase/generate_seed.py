import uuid

categories = [
    {"id": "1a8a25c1-6b4d-4952-bbef-8efb0e008441", "name_ka": "ხელნაკეთი კოქტეილები — 22₾", "name_en": "Hand Crafted Cocktails — 22₾", "name_uk": "Авторські коктейлі — 22₾", "order_index": 0},
    {"id": "2b9b36d2-7c5e-4063-cc0a-9f0c1f119552", "name_ka": "კლასიკური კოქტეილები", "name_en": "Classic Cocktails", "name_uk": "Класичні коктейлі", "order_index": 1},
    {"id": "3c0c47e3-8d6f-4174-dd1b-af1d2e22a663", "name_ka": "სპირტიანი სასმელები", "name_en": "Spirits", "name_uk": "Міцні напої", "order_index": 2},
    {"id": "4d1d58f4-9e7a-4285-ee2c-bf2e3f33b774", "name_ka": "ლუდი", "name_en": "Beer", "name_uk": "Пиво", "order_index": 3},
    {"id": "5e2e6905-0f8b-4396-ff3d-cf3f4f44c885", "name_ka": "უალკოჰოლო სასმელები", "name_en": "Soft Drinks", "name_uk": "Безалкогольні напої", "order_index": 4},
    {"id": "6f3f7a16-1a9c-44a7-8a4e-df4f5c55d996", "name_ka": "ყავა და ჩაი", "name_en": "Coffee & Tea", "name_uk": "Кава та чай", "order_index": 5},
    {"id": "7a4a8b27-2b0d-45b8-bb5f-ef5f6f66e007", "name_ka": "ღვინო", "name_en": "Wine", "name_uk": "Вино", "order_index": 6},
    {"id": "8b5b9c38-3c1e-46c9-cc6f-ff6f7e77f118", "name_ka": "ცქრიალა ღვინო", "name_en": "Sparkling Wine", "name_uk": "Ігристе вино", "order_index": 7},
    {"id": "9c6c0d49-4d2f-47da-ad7a-0a7a8d88e229", "name_ka": "სალათები", "name_en": "Salads", "name_uk": "Салати", "order_index": 8},
    {"id": "0d7d1e50-5e3a-48eb-ad8b-1b8b9f99a330", "name_ka": "სნექები", "name_en": "Snacks", "name_uk": "Закуски", "order_index": 9},
    {"id": "1e8e2f61-6f4b-49fc-be9c-2c9c0d00f441", "name_ka": "პიცა და ცომეული", "name_en": "Pizza & Dough", "name_uk": "Піца та випічка", "order_index": 10},
    {"id": "2f9f3a72-7a5c-40fd-afad-3dad1c11a552", "name_ka": "ბურგერები და სენდვიჩები", "name_en": "Burgers & Sandwiches", "name_uk": "Бургери та сендвічі", "order_index": 11},
    {"id": "3a0a4b83-8b6d-41fe-afbe-4ebe2b22e663", "name_ka": "დესერტები", "name_en": "Desserts", "name_uk": "Десерти", "order_index": 12}
]

items = []

# Hand Crafted Cocktails
hc_id = categories[0]["id"]
items.extend([
    {"cat": hc_id, "ka": "Akademikosi", "en": "Akademikosi", "uk": "Akademikosi", "desc_ka": "Bitter", "desc_en": "Bitter", "desc_uk": "Bitter", "price": "22"},
    {"cat": hc_id, "ka": "Harvest", "en": "Harvest", "uk": "Harvest", "desc_ka": "Spicy, Chilli", "desc_en": "Spicy, Chilli", "desc_uk": "Spicy, Chilli", "price": "22"},
    {"cat": hc_id, "ka": "Bubble Freeze", "en": "Bubble Freeze", "uk": "Bubble Freeze", "desc_ka": "Tropical", "desc_en": "Tropical", "desc_uk": "Tropical", "price": "22"},
    {"cat": hc_id, "ka": "Berry Gimlet", "en": "Berry Gimlet", "uk": "Berry Gimlet", "desc_ka": "Tropical", "desc_en": "Tropical", "desc_uk": "Tropical", "price": "22"},
    {"cat": hc_id, "ka": "Dream", "en": "Dream", "uk": "Dream", "desc_ka": "Sweet, Creamy", "desc_en": "Sweet, Creamy", "desc_uk": "Sweet, Creamy", "price": "22"}
])

# Classic Cocktails
cl_id = categories[1]["id"]
for name in ["Negroni", "Whiskey Sour", "Gin Sour Maracuya", "Aperol / Limoncello Spritz", "Mai Tai", "Daiquiri / Margarita", "Old Fashioned", "Espresso Martini", "Gin Breeze / Basil Smash"]:
    price = "20" if name == "Negroni" else ("22" if "Maracuya" in name or "Spritz" in name else "19")
    items.append({"cat": cl_id, "ka": name, "en": name, "uk": name, "price": price})

# Spirits
sp_id = categories[2]["id"]
spirits_list = [
    ("Aperol", "11"), ("Campari", "12"), ("Jagermeister", "10"), ("Limoncello", "11"),
    ("Absolut", "10"), ("Gray Goose", "20"), ("Tullamore Dew", "14"), ("Jameson", "15"),
    ("Jack Daniel's", "16"), ("Monkey Shoulder", "22"), ("Hendrick's", "22"), ("The Botanist", "22"),
    ("Beefeater", "12"), ("Tanqueray", "15"), ("Bombay", "16"), ("Captain Morgan", "11"),
    ("Havana Club", "13"), ("Bacardi", "12"), ("Hennessy VS", "29"), ("Milagro Reposado", "18"),
    ("Jose Cuervo", "14")
]
for name, price in spirits_list:
    items.append({"cat": sp_id, "ka": name, "en": name, "uk": name, "price": price})

# Beer
be_id = categories[3]["id"]
beers = [
    ("Heineken", "12"), ("Corona", "14"), ("Estrella", "11"),
    ("Lowenbrau", "12"), ("Tuati", "15"), ("Cider", "17/38")
]
for name, price in beers:
    items.append({"cat": be_id, "ka": name, "en": name, "uk": name, "price": price})

# Soft Drinks
sd_id = categories[4]["id"]
soft_drinks = [
    ("წყალი", "Water 0.5", "Вода 0.5", "3"),
    ("ბორჯომი", "Borjomi 0.5", "Боржомі 0.5", "4"),
    ("კოკა-კოლა / ფანტა / სპრაიტი / ტონიკი", "Coca-Cola / Fanta / Sprite / Tonic", "Кока-кола / Фанта / Спрайт / Тонік", "5"),
    ("რედ ბული", "Red Bull", "Ред Булл", "10"),
    ("წვენი", "Juice", "Сік", "5"),
    ("ლიმონათი", "Lemonade", "Лимонад", "10"),
    ("ცივი ჩაი", "Ice Tea", "Холодний чай", "8")
]
for ka, en, uk, price in soft_drinks:
    items.append({"cat": sd_id, "ka": ka, "en": en, "uk": uk, "price": price})

# Coffee & Tea
ct_id = categories[5]["id"]
coffee_tea = [
    ("ესპრესო", "Espresso", "Еспресо", "5"),
    ("ამერიკანო", "Americano", "Американо", "6"),
    ("კაპუჩინო", "Cappuccino", "Капучино", "7"),
    ("ლატე", "Latte", "Лате", "8"),
    ("ცივი ყავა ნაყინით", "Ice Coffee with Ice Cream", "Холодна кава з морозивом", "10"),
    ("ჩაი (მწვანე / შავი / ხილის)", "Tea (Green / Black / Fruit)", "Чай (зелений / чорний / фруктовий)", "6"),
    ("ცხელი შოკოლადი", "Hot Chocolate", "Гарячий шоколад", "8"),
    ("მილქშეიქი", "Milkshake", "Мілкшейк", "10"),
    ("სმუზი", "Smoothie", "Смузі", "10"),
    ("ფრეში (ფორთოხალი / გრეიფრუტი / ვაშლი)", "Fresh Juice (Orange / Grapefruit / Apple)", "Фреш (апельсин / грейпфрут / яблуко)", "12")
]
for ka, en, uk, price in coffee_tea:
    items.append({"cat": ct_id, "ka": ka, "en": en, "uk": uk, "price": price})

# Wine
wn_id = categories[6]["id"]
wines = [
    ("საფერავი", "Saperavi", "Сапераві", "10 / 45"),
    ("რქაწითელი", "Rkatsiteli", "Ркацителі", "8 / 35"),
    ("მწვანე", "Mtsvane", "Мцване", "9 / 40"),
    ("ქისი", "Kisi", "Кісі", "9 / 40"),
    ("წინანდალი", "Tsinandali", "Цинандалі", "8 / 35"),
    ("ქინძმარაული", "Kindzmarauli", "Кіндзмараулі", "9 / 40"),
    ("ხაშმის საფერავი", "Khashmi Saperavi", "Хашмі Сапераві", "12 / 55"),
    ("თავკვერი", "Tavkveri", "Тавквері", "9 / 40")
]
for ka, en, uk, price in wines:
    items.append({"cat": wn_id, "ka": ka, "en": en, "uk": uk, "price": price})

# Sparkling Wine
sw_id = categories[7]["id"]
sparkling = [
    ("პროსეკო", "Prosecco", "Просекко", "12 / 55"),
    ("ასკანელი", "Askaneli", "Асканелі", "35"),
    ("ბაგრატიონი", "Bagrationi", "Багратіоні", "25")
]
for ka, en, uk, price in sparkling:
    items.append({"cat": sw_id, "ka": ka, "en": en, "uk": uk, "price": price})

# Salads
sl_id = categories[8]["id"]
salads = [
    ("ცეზარი ქათმით", "Caesar Salad with Chicken", "Цезар з куркою", "18"),
    ("ცეზარი კრევეტით", "Caesar Salad with Shrimps", "Цезар з креветками", "22"),
    ("ბერძნული სალათი", "Greek Salad", "Грецький салат", "14"),
    ("ბოსტნეულის სალათი", "Vegetable Salad", "Овочевий салат", "12"),
    ("ბოსტნეულის სალათი ნიგვზით", "Vegetable Salad with Walnuts", "Овочевий салат з горіхами", "14")
]
for ka, en, uk, price in salads:
    items.append({"cat": sl_id, "ka": ka, "en": en, "uk": uk, "price": price})

# Snacks
sn_id = categories[9]["id"]
snacks = [
    ("კარტოფილი ფრი", "French Fries", "Картопля фрі", "8"),
    ("მექსიკური კარტოფილი", "Mexican Potatoes", "Картопля по-мексиканськи", "10"),
    ("კარტოფილი ფრი ყველით და ბეკონით", "French Fries with Cheese and Bacon", "Картопля фрі з сиром та беконом", "14"),
    ("ყველის ბურთულები", "Cheese Balls", "Сирні кульки", "12"),
    ("ყველის ასორტი", "Cheese Platter", "Сирна тарілка", "25"),
    ("ხილის ასორტი", "Fruit Platter", "Фруктова тарілка", "20"),
    ("მისაყოლებელი ლუდზე", "Beer Board", "Пивна тарілка", "25"),
    ("გრილზე შემწვარი ბოსტნეული", "Grilled Vegetables", "Овочі на грилі", "12"),
    ("ქათმის ნაგეთსები", "Chicken Nuggets", "Курячі нагетси", "12"),
    ("ქათმის ფრთები ბარბექიუ", "BBQ Chicken Wings", "Курячі крильця барбекю", "14"),
    ("ყველის ჩხირები", "Cheese Sticks", "Сирні палички", "12"),
    ("ნიორის პური", "Garlic Bread", "Часниковий хліб", "8"),
    ("ედამამე", "Edamame", "Едамаме", "10")
]
for ka, en, uk, price in snacks:
    items.append({"cat": sn_id, "ka": ka, "en": en, "uk": uk, "price": price})

# Pizza & Dough
pz_id = categories[10]["id"]
pizza = [
    ("პიცა მარგარიტა", "Pizza Margherita", "Піца Маргарита", "18"),
    ("პიცა პეპერონი", "Pizza Pepperoni", "Піца Пепероні", "22"),
    ("პიცა ოთხი ყველი", "Pizza Four Cheese", "Піца чотири сири", "24"),
    ("პიცა პროშუტო", "Pizza Prosciutto", "Піца Прошуто", "24"),
    ("პიცა ვეგეტარიანული", "Pizza Vegetarian", "Піца Вегетаріанська", "18"),
    ("პიცა ჩიკენ ბარბექიუ", "Pizza Chicken BBQ", "Піца з куркою барбекю", "22"),
    ("იმერული ხაჭაპური", "Imeruli Khachapuri", "Хачапурі Імеретинський", "15"),
    ("მეგრული ხაჭაპური", "Megruli Khachapuri", "Хачапурі Мегрельський", "18"),
    ("აჭარული ხაჭაპური", "Adjaruli Khachapuri", "Хачапурі Аджарський", "16"),
    ("ლობიანი", "Lobiani", "Лобіані", "12")
]
for ka, en, uk, price in pizza:
    items.append({"cat": pz_id, "ka": ka, "en": en, "uk": uk, "price": price})

# Burgers
bg_id = categories[11]["id"]
burgers = [
    ("საქონლის ბურგერი", "Beef Burger", "Бургер з яловичиною", "20"),
    ("ქათმის ბურგერი", "Chicken Burger", "Бургер з куркою", "18"),
    ("ორმაგი ბურგერი", "Double Burger", "Подвійний бургер", "26"),
    ("კლაბ სენდვიჩი", "Club Sandwich", "Клаб-сендвіч", "16"),
    ("ვეგეტარიანული ბურგერი", "Veggie Burger", "Вегетаріанський бургер", "16"),
    ("ჩიზბურგერი", "Cheeseburger", "Чізбургер", "18")
]
for ka, en, uk, price in burgers:
    items.append({"cat": bg_id, "ka": ka, "en": en, "uk": uk, "price": price})

# Desserts
ds_id = categories[12]["id"]
desserts = [
    ("ჩიზქეიქი", "Cheesecake", "Чізкейк", "12"),
    ("ბრაუნი ნაყინით", "Brownie with Ice Cream", "Брауні з морозивом", "12"),
    ("ნაყინის ასორტი", "Ice Cream Platter", "Асорті морозива", "10"),
    ("ვაფლი ხილით და ნაყინით", "Waffle with Fruit and Ice Cream", "Вафлі з фруктами та морозивом", "14"),
    ("ვაფლი შოკოლადით", "Waffle with Chocolate", "Вафлі з шоколадом", "12"),
    ("ვაფლი კარამელით", "Waffle with Caramel", "Вафлі з карамеллю", "12")
]
for ka, en, uk, price in desserts:
    items.append({"cat": ds_id, "ka": ka, "en": en, "uk": uk, "price": price})

sql = []
sql.append("TRUNCATE menu_items, menu_categories, events CASCADE;\n")

# Categories
cat_lines = []
for c in categories:
    # validate uuid
    uuid.UUID(c["id"])
    cat_lines.append(f"('{c['id']}', '{c['name_ka']}', '{c['name_en']}', '{c['name_uk']}', {c['order_index']})")
sql.append("INSERT INTO menu_categories (id, name_ka, name_en, name_uk, order_index) VALUES\n" + ",\n".join(cat_lines) + ";\n")

# Items
item_lines = []
for idx, it in enumerate(items):
    uuid.UUID(it["cat"])
    desc_ka = f"'{it['desc_ka']}'" if "desc_ka" in it else "NULL"
    desc_en = f"'{it['desc_en']}'" if "desc_en" in it else "NULL"
    desc_uk = f"'{it['desc_uk']}'" if "desc_uk" in it else "NULL"
    
    item_lines.append(f"('{it['cat']}', '{it['ka']}', '{it['en']}', '{it['uk']}', {desc_ka}, {desc_en}, {desc_uk}, '{it['price']}', true, {idx})")

sql.append("INSERT INTO menu_items (category_id, name_ka, name_en, name_uk, description_ka, description_en, description_uk, price, is_available, order_index) VALUES\n" + ",\n".join(item_lines) + ";\n")

# Events
events = [
    ('Underground Jam', 'Underground Jam', 'Underground Jam', 'ღია მიკროფონი', 'Open Mic Night', 'Відкритий мікрофон', 'ოთხშაბათი', 'Wednesday', 'Середа', '21:00', 0),
    ('Jupiter Nights', 'Jupiter Nights', 'Jupiter Nights', 'DJ სეტი', 'DJ Set', 'DJ сет', 'პარასკევი', 'Friday', "П'ятниця", '23:00', 1),
    ('ცოცხალი მუსიკა', 'Live Bands', 'Живі гурти', 'მოწვეული არტისტები', 'Featured Artists', 'Запрошені არтисти', 'შაბათი', 'Saturday', 'Субота', '22:00', 2)
]
event_lines = []
for ev in events:
    event_lines.append(f"('{ev[0]}', '{ev[1]}', '{ev[2]}', '{ev[3]}', '{ev[4]}', '{ev[5]}', '{ev[6]}', '{ev[7]}', '{ev[8]}', '{ev[9]}', {ev[10]})")

sql.append("INSERT INTO events (title_ka, title_en, title_uk, description_ka, description_en, description_uk, event_day_ka, event_day_en, event_day_uk, event_time, order_index) VALUES\n" + ",\n".join(event_lines) + ";\n")

with open("supabase/seed.sql", "w", encoding="utf-8") as f:
    f.write("\n".join(sql))

print("Seed SQL generated successfully!")
