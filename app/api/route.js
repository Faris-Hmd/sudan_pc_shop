import { randomInt } from "crypto";
import { db } from "../db/firebase";
import { collection, addDoc } from "firebase/firestore";
export async function GET(request) {
  function displayedImg() {
    return "pc" + randomInt(1, 4) + ".png";
  }

  async function uploadSequentially() {
    const colRef = collection(db, "products");

    for (const item of products) {
      try {
        const docRef = await addDoc(colRef, {
          ...item,
          p_img: displayedImg(),
        });
        console.log("Uploaded:", item, " → ID:", docRef.id);
      } catch (error) {
        console.error("Error uploading:", item, error);
      }
    }
  }

  const users = [
    { email: "james.wilson@example.com", name: "James Wilson", role: "admin" },
    { email: "sara.miller@example.com", name: "Sara Miller", role: "user" },
    {
      email: "mohamed.khalid@example.com",
      name: "Mohamed Khalid",
      role: "user",
    },
    { email: "linda.brown@example.com", name: "Linda Brown", role: "admin" },
    { email: "kevin.cho@example.com", name: "Kevin Cho", role: "user" },
    { email: "fatima.ali@example.com", name: "Fatima Ali", role: "user" },
    { email: "robert.smith@example.com", name: "Robert Smith", role: "user" },
    {
      email: "emily.john@example.com",
      name: "Emily Johnson",
      role: "admin",
    },
    { email: "david.park@example.com", name: "David Park", role: "user" },
    { email: "noor.hassan@example.com", name: "Noor Hassan", role: "user" },
    { email: "steven.moore@example.com", name: "Steven Moore", role: "user" },
    { email: "laila.omar@example.com", name: "Laila Omar", role: "admin" },
    { email: "chris.evans@example.com", name: "Chris Evans", role: "user" },
    { email: "ahmed.sami@example.com", name: "Ahmed Sami", role: "user" },
    { email: "mia.davis@example.com", name: "Mia Davis", role: "admin" },
    { email: "jason.lee@example.com", name: "Jason Lee", role: "user" },
    { email: "yara.adel@example.com", name: "Yara Adel", role: "user" },
    {
      email: "patrick.turner@example.com",
      name: "Patrick Turner",
      role: "user",
    },
    { email: "sophia.clark@example.com", name: "Sophia Clark", role: "admin" },
    { email: "omar.hadi@example.com", name: "Omar Hadi", role: "user" },
  ];

  const products = [
    {
      p_name: "Logitech Pc Max 728",
      p_cat: "PC",
      p_cost: 204.92,
    },
    {
      p_name: "MSI Keyboards Max 27",
      p_cat: "KEYBOARDS",
      p_cost: 1212.77,
    },
    {
      p_name: "Acer Webcams Ultra 256",
      p_cat: "WEBCAMS",
      p_cost: 1948.64,
    },
    {
      p_name: "Epson Desktop Max 585",
      p_cat: "DESKTOP",
      p_cost: 767.93,
    },
    {
      p_name: "Creative Keyboards Series S 604",
      p_cat: "KEYBOARDS",
      p_cost: 1983.25,
    },
    {
      p_name: "Razer Ssd Series S 858",
      p_cat: "SSD",
      p_cost: 1154.24,
    },
    {
      p_name: "Microsoft Speakers Prime 935",
      p_cat: "SPEAKERS",
      p_cost: 449.35,
    },
    {
      p_name: "Lenovo Microphones Essential 323",
      p_cat: "MICROPHONES",
      p_cost: 434.96,
    },
    {
      p_name: "Dell Ssd Slim 704",
      p_cat: "SSD",
      p_cost: 1116.39,
    },
    {
      p_name: "Asus Headsets Edge 344",
      p_cat: "HEADSETS",
      p_cost: 579.16,
    },
    {
      p_name: "HP Speakers Flex 142",
      p_cat: "SPEAKERS",
      p_cost: 751.2,
    },
    {
      p_name: "Microsoft Headsets Series S 841",
      p_cat: "HEADSETS",
      p_cost: 548.77,
    },
    {
      p_name: "Epson Printers Edge 344",
      p_cat: "PRINTERS",
      p_cost: 942.07,
    },
    {
      p_name: "Microsoft Speakers Flex 473",
      p_cat: "SPEAKERS",
      p_cost: 1069.19,
    },
    {
      p_name: "MSI Keyboards Series X 136",
      p_cat: "KEYBOARDS",
      p_cost: 252.98,
    },
    {
      p_name: "Logitech Tablets Slim 564",
      p_cat: "TABLETS",
      p_cost: 618.39,
    },
    {
      p_name: "Lenovo Microphones Essential 245",
      p_cat: "MICROPHONES",
      p_cost: 1489.84,
    },
    {
      p_name: "Canon Printers Edge 271",
      p_cat: "PRINTERS",
      p_cost: 96.42,
    },
    {
      p_name: "Creative Tablets Series X 68",
      p_cat: "TABLETS",
      p_cost: 987.92,
    },
    {
      p_name: "Creative Pc Prime 772",
      p_cat: "PC",
      p_cost: 1538.35,
    },
    {
      p_name: "Epson Projectors Max 811",
      p_cat: "PROJECTORS",
      p_cost: 1467.67,
    },
    {
      p_name: "Samsung Pc Essential 668",
      p_cat: "PC",
      p_cost: 1855.78,
    },
    {
      p_name: "Acer Webcams Air 969",
      p_cat: "WEBCAMS",
      p_cost: 1364.57,
    },
    {
      p_name: "Acer Printers Air 347",
      p_cat: "PRINTERS",
      p_cost: 814.67,
    },
    {
      p_name: "HP Scanners Compact 927",
      p_cat: "SCANNERS",
      p_cost: 592.26,
    },
    {
      p_name: "MSI Keyboards Neo 652",
      p_cat: "KEYBOARDS",
      p_cost: 769.73,
    },
    {
      p_name: "Canon Keyboards Essential 10",
      p_cat: "KEYBOARDS",
      p_cost: 1441.63,
    },
    {
      p_name: "HP Desktop Series S 588",
      p_cat: "DESKTOP",
      p_cost: 192.52,
    },
    {
      p_name: "Creative Scanners Pro 263",
      p_cat: "SCANNERS",
      p_cost: 1425.79,
    },
    {
      p_name: "Dell Speakers Compact 557",
      p_cat: "SPEAKERS",
      p_cost: 423.6,
    },
    {
      p_name: "Creative Laptop Prime 674",
      p_cat: "LAPTOP",
      p_cost: 394.68,
    },
    {
      p_name: "Sony Keyboards Ultra 565",
      p_cat: "KEYBOARDS",
      p_cost: 1202.53,
    },
    {
      p_name: "Canon Tablets Neo 915",
      p_cat: "TABLETS",
      p_cost: 596.86,
    },
    {
      p_name: "Samsung Monitors Edge 338",
      p_cat: "MONITORS",
      p_cost: 1934.82,
    },
    {
      p_name: "MSI Tablets Slim 874",
      p_cat: "TABLETS",
      p_cost: 1644.59,
    },
    {
      p_name: "Razer Speakers Flex 300",
      p_cat: "SPEAKERS",
      p_cost: 280.67,
    },
    {
      p_name: "Lenovo Monitors Essential 424",
      p_cat: "MONITORS",
      p_cost: 88.97,
    },
    {
      p_name: "Dell Monitors Series X 625",
      p_cat: "MONITORS",
      p_cost: 456.05,
    },
    {
      p_name: "Logitech Projectors Series S 638",
      p_cat: "PROJECTORS",
      p_cost: 1503.67,
    },
    {
      p_name: "Razer Laptop Essential 325",
      p_cat: "LAPTOP",
      p_cost: 1653.15,
    },
    {
      p_name: "Microsoft Hard_Drives Neo 769",
      p_cat: "HARD_DRIVES",
      p_cost: 625.04,
    },
    {
      p_name: "Samsung Desktop Max 479",
      p_cat: "DESKTOP",
      p_cost: 1162.25,
    },
    {
      p_name: "HP Keyboards Pro 510",
      p_cat: "KEYBOARDS",
      p_cost: 1766.84,
    },
    {
      p_name: "Acer Scanners Prime 65",
      p_cat: "SCANNERS",
      p_cost: 1764.92,
    },
    {
      p_name: "Creative Webcams Air 243",
      p_cat: "WEBCAMS",
      p_cost: 888.92,
    },
    {
      p_name: "Asus Headsets Max 51",
      p_cat: "HEADSETS",
      p_cost: 293.22,
    },
    {
      p_name: "Creative Pc Slim 780",
      p_cat: "PC",
      p_cost: 1333.58,
    },
    {
      p_name: "Samsung Projectors Edge 710",
      p_cat: "PROJECTORS",
      p_cost: 1009.58,
    },
    {
      p_name: "Dell Pc Series S 170",
      p_cat: "PC",
      p_cost: 1676.63,
    },
    {
      p_name: "Lenovo Microphones Series S 740",
      p_cat: "MICROPHONES",
      p_cost: 462.2,
    },
    {
      p_name: "Asus Headsets Compact 69",
      p_cat: "HEADSETS",
      p_cost: 1834.79,
    },
    {
      p_name: "Microsoft Printers Prime 325",
      p_cat: "PRINTERS",
      p_cost: 1705.31,
    },
    {
      p_name: "Logitech Monitors Edge 758",
      p_cat: "MONITORS",
      p_cost: 563.92,
    },
    {
      p_name: "Dell Microphones Compact 800",
      p_cat: "MICROPHONES",
      p_cost: 1342.8,
    },
    {
      p_name: "Creative Scanners Slim 596",
      p_cat: "SCANNERS",
      p_cost: 1433.11,
    },
    {
      p_name: "MSI Desktop Slim 861",
      p_cat: "DESKTOP",
      p_cost: 339.27,
    },
    {
      p_name: "Creative Scanners Series X 823",
      p_cat: "SCANNERS",
      p_cost: 393.05,
    },
    {
      p_name: "HP Pc Air 645",
      p_cat: "PC",
      p_cost: 1888.51,
    },
    {
      p_name: "Logitech Webcams Pro 162",
      p_cat: "WEBCAMS",
      p_cost: 400.69,
    },
    {
      p_name: "Sony Speakers Air 90",
      p_cat: "SPEAKERS",
      p_cost: 1611.7,
    },
    {
      p_name: "Asus Monitors Edge 520",
      p_cat: "MONITORS",
      p_cost: 241.82,
    },
    {
      p_name: "Canon Pc Series X 462",
      p_cat: "PC",
      p_cost: 1936.34,
    },
    {
      p_name: "Creative Hard_Drives Prime 912",
      p_cat: "HARD_DRIVES",
      p_cost: 1842.97,
    },
    {
      p_name: "Lenovo Speakers Neo 370",
      p_cat: "SPEAKERS",
      p_cost: 1980.9,
    },
    {
      p_name: "HP Ssd Essential 537",
      p_cat: "SSD",
      p_cost: 43.52,
    },
    {
      p_name: "Lenovo Scanners Plus 534",
      p_cat: "SCANNERS",
      p_cost: 1745.96,
    },
    {
      p_name: "Lenovo Monitors Essential 847",
      p_cat: "MONITORS",
      p_cost: 338.05,
    },
    {
      p_name: "Sony Monitors Edge 369",
      p_cat: "MONITORS",
      p_cost: 524.34,
    },
    {
      p_name: "Razer Printers Slim 557",
      p_cat: "PRINTERS",
      p_cost: 1007.82,
    },
    {
      p_name: "Creative Keyboards Essential 738",
      p_cat: "KEYBOARDS",
      p_cost: 1884.03,
    },
    {
      p_name: "Razer Microphones Plus 349",
      p_cat: "MICROPHONES",
      p_cost: 227.45,
    },
    {
      p_name: "Sony Ssd Pro 595",
      p_cat: "SSD",
      p_cost: 970.54,
    },
    {
      p_name: "Lenovo Headsets Air 614",
      p_cat: "HEADSETS",
      p_cost: 1770.25,
    },
    {
      p_name: "Acer Printers Plus 748",
      p_cat: "PRINTERS",
      p_cost: 640.63,
    },
    {
      p_name: "HP Ssd Neo 960",
      p_cat: "SSD",
      p_cost: 879.84,
    },
    {
      p_name: "Razer Tablets Max 800",
      p_cat: "TABLETS",
      p_cost: 1466.93,
    },
    {
      p_name: "Sony Monitors Pro 305",
      p_cat: "MONITORS",
      p_cost: 1460.11,
    },
    {
      p_name: "Logitech Ssd Max 536",
      p_cat: "SSD",
      p_cost: 739.09,
    },
    {
      p_name: "Creative Keyboards Prime 685",
      p_cat: "KEYBOARDS",
      p_cost: 365.12,
    },
    {
      p_name: "Sony Keyboards Series S 309",
      p_cat: "KEYBOARDS",
      p_cost: 150.61,
    },
    {
      p_name: "Canon Printers Essential 12",
      p_cat: "PRINTERS",
      p_cost: 949.61,
    },
    {
      p_name: "Sony Laptop Prime 725",
      p_cat: "LAPTOP",
      p_cost: 1985.92,
    },
    {
      p_name: "Canon Scanners Pro 71",
      p_cat: "SCANNERS",
      p_cost: 1275.29,
    },
    {
      p_name: "HP Webcams Edge 17",
      p_cat: "WEBCAMS",
      p_cost: 1772.98,
    },
    {
      p_name: "Razer Pc Flex 662",
      p_cat: "PC",
      p_cost: 1446.03,
    },
    {
      p_name: "MSI Pc Plus 259",
      p_cat: "PC",
      p_cost: 1844.38,
    },
    {
      p_name: "Razer Speakers Series X 664",
      p_cat: "SPEAKERS",
      p_cost: 1951.24,
    },
    {
      p_name: "Samsung Mouses Slim 497",
      p_cat: "MOUSES",
      p_cost: 1504.97,
    },
    {
      p_name: "Samsung Keyboards Plus 357",
      p_cat: "KEYBOARDS",
      p_cost: 143.98,
    },
    {
      p_name: "Acer Webcams Air 16",
      p_cat: "WEBCAMS",
      p_cost: 502.63,
    },
    {
      p_name: "Creative Speakers Edge 737",
      p_cat: "SPEAKERS",
      p_cost: 1209.85,
    },
    {
      p_name: "Logitech Tablets Series S 577",
      p_cat: "TABLETS",
      p_cost: 1945.96,
    },
    {
      p_name: "MSI Mouses Max 988",
      p_cat: "MOUSES",
      p_cost: 1079.78,
    },
    {
      p_name: "Creative Monitors Flex 663",
      p_cat: "MONITORS",
      p_cost: 1532.24,
    },
    {
      p_name: "Epson Webcams Neo 150",
      p_cat: "WEBCAMS",
      p_cost: 1942.36,
    },
    {
      p_name: "Acer Keyboards Ultra 861",
      p_cat: "KEYBOARDS",
      p_cost: 264.25,
    },
    {
      p_name: "HP Microphones Ultra 743",
      p_cat: "MICROPHONES",
      p_cost: 225.12,
    },
    {
      p_name: "Razer Laptop Series S 215",
      p_cat: "LAPTOP",
      p_cost: 1314.62,
    },
    {
      p_name: "Asus Laptop Pro 960",
      p_cat: "LAPTOP",
      p_cost: 1861.81,
    },
    {
      p_name: "Canon Printers Edge 695",
      p_cat: "PRINTERS",
      p_cost: 1081.16,
    },
    {
      p_name: "Asus Microphones Flex 268",
      p_cat: "MICROPHONES",
      p_cost: 26.82,
    },
    {
      p_name: "HP Pc Edge 502",
      p_cat: "PC",
      p_cost: 232.16,
    },
    {
      p_name: "Asus Microphones Air 670",
      p_cat: "MICROPHONES",
      p_cost: 1830.5,
    },
    {
      p_name: "Asus Headsets Flex 967",
      p_cat: "HEADSETS",
      p_cost: 1357.92,
    },
    {
      p_name: "Creative Speakers Ultra 321",
      p_cat: "SPEAKERS",
      p_cost: 503.77,
    },
    {
      p_name: "Creative Webcams Prime 219",
      p_cat: "WEBCAMS",
      p_cost: 675.16,
    },
    {
      p_name: "Epson Desktop Edge 102",
      p_cat: "DESKTOP",
      p_cost: 1867.11,
    },
    {
      p_name: "Lenovo Monitors Compact 728",
      p_cat: "MONITORS",
      p_cost: 601.35,
    },
    {
      p_name: "Creative Laptop Pro 52",
      p_cat: "LAPTOP",
      p_cost: 488.51,
    },
    {
      p_name: "Samsung Projectors Flex 116",
      p_cat: "PROJECTORS",
      p_cost: 1301.73,
    },
    {
      p_name: "Dell Microphones Flex 99",
      p_cat: "MICROPHONES",
      p_cost: 129.0,
    },
    {
      p_name: "Microsoft Mouses Pro 26",
      p_cat: "MOUSES",
      p_cost: 845.24,
    },
    {
      p_name: "HP Ssd Pro 819",
      p_cat: "SSD",
      p_cost: 1863.75,
    },
    {
      p_name: "Dell Projectors Plus 928",
      p_cat: "PROJECTORS",
      p_cost: 1081.14,
    },
    {
      p_name: "Lenovo Monitors Edge 642",
      p_cat: "MONITORS",
      p_cost: 808.08,
    },
    {
      p_name: "Logitech Webcams Essential 390",
      p_cat: "WEBCAMS",
      p_cost: 491.83,
    },
    {
      p_name: "Microsoft Pc Max 886",
      p_cat: "PC",
      p_cost: 769.61,
    },
    {
      p_name: "Epson Microphones Flex 73",
      p_cat: "MICROPHONES",
      p_cost: 229.57,
    },
    {
      p_name: "Epson Ssd Essential 476",
      p_cat: "SSD",
      p_cost: 1358.96,
    },
    {
      p_name: "Sony Scanners Pro 570",
      p_cat: "SCANNERS",
      p_cost: 1558.73,
    },
    {
      p_name: "Canon Hard_Drives Series X 769",
      p_cat: "HARD_DRIVES",
      p_cost: 1633.11,
    },
    {
      p_name: "Sony Microphones Pro 677",
      p_cat: "MICROPHONES",
      p_cost: 880.15,
    },
    {
      p_name: "Lenovo Mouses Plus 695",
      p_cat: "MOUSES",
      p_cost: 767.03,
    },
    {
      p_name: "Epson Hard_Drives Flex 697",
      p_cat: "HARD_DRIVES",
      p_cost: 1908.09,
    },
    {
      p_name: "Lenovo Webcams Slim 872",
      p_cat: "WEBCAMS",
      p_cost: 1567.46,
    },
    {
      p_name: "Microsoft Laptop Plus 232",
      p_cat: "LAPTOP",
      p_cost: 205.12,
    },
    {
      p_name: "MSI Microphones Ultra 921",
      p_cat: "MICROPHONES",
      p_cost: 1754.17,
    },
    {
      p_name: "Canon Monitors Air 938",
      p_cat: "MONITORS",
      p_cost: 1161.45,
    },
    {
      p_name: "Canon Hard_Drives Compact 438",
      p_cat: "HARD_DRIVES",
      p_cost: 225.28,
    },
    {
      p_name: "Samsung Tablets Edge 506",
      p_cat: "TABLETS",
      p_cost: 361.06,
    },
    {
      p_name: "Logitech Ssd Prime 417",
      p_cat: "SSD",
      p_cost: 1051.12,
    },
    {
      p_name: "Dell Scanners Compact 977",
      p_cat: "SCANNERS",
      p_cost: 782.58,
    },
    {
      p_name: "Microsoft Printers Pro 70",
      p_cat: "PRINTERS",
      p_cost: 299.56,
    },
    {
      p_name: "Razer Ssd Flex 154",
      p_cat: "SSD",
      p_cost: 1836.35,
    },
    {
      p_name: "Sony Ssd Max 345",
      p_cat: "SSD",
      p_cost: 1323.74,
    },
    {
      p_name: "Logitech Mouses Pro 309",
      p_cat: "MOUSES",
      p_cost: 1711.39,
    },
    {
      p_name: "HP Monitors Essential 946",
      p_cat: "MONITORS",
      p_cost: 653.44,
    },
    {
      p_name: "Sony Scanners Compact 76",
      p_cat: "SCANNERS",
      p_cost: 766.22,
    },
    {
      p_name: "Epson Projectors Flex 418",
      p_cat: "PROJECTORS",
      p_cost: 1588.76,
    },
    {
      p_name: "Acer Microphones Series S 922",
      p_cat: "MICROPHONES",
      p_cost: 1411.61,
    },
    {
      p_name: "MSI Hard_Drives Series X 868",
      p_cat: "HARD_DRIVES",
      p_cost: 572.67,
    },
    {
      p_name: "Microsoft Ssd Compact 334",
      p_cat: "SSD",
      p_cost: 1552.66,
    },
    {
      p_name: "Creative Printers Series S 192",
      p_cat: "PRINTERS",
      p_cost: 1774.53,
    },
    {
      p_name: "Acer Pc Pro 68",
      p_cat: "PC",
      p_cost: 908.15,
    },
    {
      p_name: "Creative Printers Max 606",
      p_cat: "PRINTERS",
      p_cost: 154.58,
    },
    {
      p_name: "Creative Headsets Max 57",
      p_cat: "HEADSETS",
      p_cost: 184.31,
    },
    {
      p_name: "Sony Monitors Edge 765",
      p_cat: "MONITORS",
      p_cost: 1244.65,
    },
    {
      p_name: "Razer Hard_Drives Flex 417",
      p_cat: "HARD_DRIVES",
      p_cost: 25.14,
    },
    {
      p_name: "Creative Mouses Series S 786",
      p_cat: "MOUSES",
      p_cost: 1641.86,
    },
    {
      p_name: "MSI Tablets Pro 415",
      p_cat: "TABLETS",
      p_cost: 1859.24,
    },
    {
      p_name: "Asus Scanners Plus 340",
      p_cat: "SCANNERS",
      p_cost: 378.42,
    },
    {
      p_name: "Epson Tablets Neo 804",
      p_cat: "TABLETS",
      p_cost: 619.38,
    },
    {
      p_name: "HP Speakers Max 142",
      p_cat: "SPEAKERS",
      p_cost: 868.16,
    },
    {
      p_name: "Logitech Keyboards Flex 186",
      p_cat: "KEYBOARDS",
      p_cost: 1886.53,
    },
    {
      p_name: "HP Speakers Essential 171",
      p_cat: "SPEAKERS",
      p_cost: 398.45,
    },
    {
      p_name: "Lenovo Hard_Drives Series X 428",
      p_cat: "HARD_DRIVES",
      p_cost: 683.16,
    },
    {
      p_name: "Canon Scanners Plus 656",
      p_cat: "SCANNERS",
      p_cost: 103.66,
    },
    {
      p_name: "Razer Tablets Neo 494",
      p_cat: "TABLETS",
      p_cost: 319.84,
    },
    {
      p_name: "Canon Hard_Drives Slim 13",
      p_cat: "HARD_DRIVES",
      p_cost: 230.32,
    },
    {
      p_name: "Logitech Keyboards Essential 940",
      p_cat: "KEYBOARDS",
      p_cost: 1946.72,
    },
    {
      p_name: "Canon Pc Series X 441",
      p_cat: "PC",
      p_cost: 878.18,
    },
    {
      p_name: "Creative Printers Series S 343",
      p_cat: "PRINTERS",
      p_cost: 1522.79,
    },
    {
      p_name: "Logitech Laptop Air 496",
      p_cat: "LAPTOP",
      p_cost: 268.71,
    },
    {
      p_name: "Razer Ssd Series X 380",
      p_cat: "SSD",
      p_cost: 678.1,
    },
    {
      p_name: "Asus Ssd Max 693",
      p_cat: "SSD",
      p_cost: 348.5,
    },
    {
      p_name: "Sony Laptop Series S 499",
      p_cat: "LAPTOP",
      p_cost: 1239.0,
    },
    {
      p_name: "Acer Mouses Max 165",
      p_cat: "MOUSES",
      p_cost: 686.63,
    },
    {
      p_name: "Razer Desktop Pro 852",
      p_cat: "DESKTOP",
      p_cost: 305.53,
    },
    {
      p_name: "Epson Printers Edge 878",
      p_cat: "PRINTERS",
      p_cost: 1840.75,
    },
    {
      p_name: "Samsung Hard_Drives Essential 841",
      p_cat: "HARD_DRIVES",
      p_cost: 980.01,
    },
    {
      p_name: "MSI Monitors Slim 440",
      p_cat: "MONITORS",
      p_cost: 1419.02,
    },
    {
      p_name: "Samsung Ssd Ultra 269",
      p_cat: "SSD",
      p_cost: 1251.91,
    },
    {
      p_name: "Sony Printers Series X 10",
      p_cat: "PRINTERS",
      p_cost: 737.87,
    },
    {
      p_name: "Microsoft Tablets Neo 464",
      p_cat: "TABLETS",
      p_cost: 1335.05,
    },
    {
      p_name: "Logitech Headsets Ultra 955",
      p_cat: "HEADSETS",
      p_cost: 480.85,
    },
    {
      p_name: "Epson Projectors Flex 809",
      p_cat: "PROJECTORS",
      p_cost: 956.56,
    },
    {
      p_name: "Microsoft Scanners Edge 279",
      p_cat: "SCANNERS",
      p_cost: 1954.6,
    },
    {
      p_name: "Epson Ssd Slim 717",
      p_cat: "SSD",
      p_cost: 1348.51,
    },
    {
      p_name: "Asus Webcams Series X 426",
      p_cat: "WEBCAMS",
      p_cost: 1964.19,
    },
    {
      p_name: "Canon Microphones Pro 234",
      p_cat: "MICROPHONES",
      p_cost: 1971.99,
    },
    {
      p_name: "HP Headsets Neo 739",
      p_cat: "HEADSETS",
      p_cost: 1219.39,
    },
    {
      p_name: "Dell Keyboards Edge 696",
      p_cat: "KEYBOARDS",
      p_cost: 423.51,
    },
    {
      p_name: "Dell Laptop Air 176",
      p_cat: "LAPTOP",
      p_cost: 524.29,
    },
    {
      p_name: "Canon Scanners Essential 333",
      p_cat: "SCANNERS",
      p_cost: 272.5,
    },
    {
      p_name: "HP Mouses Series S 841",
      p_cat: "MOUSES",
      p_cost: 984.7,
    },
    {
      p_name: "Logitech Microphones Plus 814",
      p_cat: "MICROPHONES",
      p_cost: 1496.48,
    },
    {
      p_name: "Canon Headsets Air 285",
      p_cat: "HEADSETS",
      p_cost: 1120.91,
    },
    {
      p_name: "Epson Microphones Neo 340",
      p_cat: "MICROPHONES",
      p_cost: 275.26,
    },
    {
      p_name: "Logitech Webcams Compact 276",
      p_cat: "WEBCAMS",
      p_cost: 117.22,
    },
    {
      p_name: "Creative Ssd Neo 891",
      p_cat: "SSD",
      p_cost: 450.78,
    },
    {
      p_name: "Samsung Mouses Max 809",
      p_cat: "MOUSES",
      p_cost: 134.24,
    },
    {
      p_name: "Razer Hard_Drives Ultra 610",
      p_cat: "HARD_DRIVES",
      p_cost: 1518.35,
    },
    {
      p_name: "Epson Tablets Flex 584",
      p_cat: "TABLETS",
      p_cost: 1465.61,
    },
    {
      p_name: "MSI Headsets Prime 386",
      p_cat: "HEADSETS",
      p_cost: 1535.07,
    },
    {
      p_name: "HP Tablets Plus 885",
      p_cat: "TABLETS",
      p_cost: 211.95,
    },
    {
      p_name: "Logitech Projectors Compact 680",
      p_cat: "PROJECTORS",
      p_cost: 1319.05,
    },
    {
      p_name: "Acer Speakers Neo 114",
      p_cat: "SPEAKERS",
      p_cost: 1099.96,
    },
    {
      p_name: "Logitech Projectors Max 3",
      p_cat: "PROJECTORS",
      p_cost: 716.51,
    },
    {
      p_name: "Razer Tablets Air 832",
      p_cat: "TABLETS",
      p_cost: 292.0,
    },
    {
      p_name: "Epson Ssd Plus 475",
      p_cat: "SSD",
      p_cost: 669.14,
    },
    {
      p_name: "Dell Pc Pro 833",
      p_cat: "PC",
      p_cost: 811.49,
    },
    {
      p_name: "Canon Tablets Slim 780",
      p_cat: "TABLETS",
      p_cost: 1707.59,
    },
    {
      p_name: "Creative Monitors Pro 28",
      p_cat: "MONITORS",
      p_cost: 1342.63,
    },
    {
      p_name: "Asus Webcams Essential 299",
      p_cat: "WEBCAMS",
      p_cost: 1651.26,
    },
    {
      p_name: "Canon Mouses Prime 734",
      p_cat: "MOUSES",
      p_cost: 1568.4,
    },
    {
      p_name: "HP Mouses Air 819",
      p_cat: "MOUSES",
      p_cost: 1127.3,
    },
    {
      p_name: "Microsoft Microphones Essential 318",
      p_cat: "MICROPHONES",
      p_cost: 1593.61,
    },
    {
      p_name: "Canon Mouses Series S 331",
      p_cat: "MOUSES",
      p_cost: 561.57,
    },
    {
      p_name: "HP Keyboards Essential 836",
      p_cat: "KEYBOARDS",
      p_cost: 575.9,
    },
    {
      p_name: "Razer Mouses Series X 230",
      p_cat: "MOUSES",
      p_cost: 1242.84,
    },
    {
      p_name: "Canon Microphones Ultra 814",
      p_cat: "MICROPHONES",
      p_cost: 269.9,
    },
    {
      p_name: "Sony Laptop Series X 188",
      p_cat: "LAPTOP",
      p_cost: 1219.56,
    },
    {
      p_name: "Samsung Microphones Neo 403",
      p_cat: "MICROPHONES",
      p_cost: 934.95,
    },
    {
      p_name: "MSI Projectors Edge 772",
      p_cat: "PROJECTORS",
      p_cost: 378.13,
    },
    {
      p_name: "Asus Headsets Plus 416",
      p_cat: "HEADSETS",
      p_cost: 815.59,
    },
    {
      p_name: "Creative Monitors Compact 221",
      p_cat: "MONITORS",
      p_cost: 1694.09,
    },
    {
      p_name: "Epson Pc Essential 413",
      p_cat: "PC",
      p_cost: 1000.97,
    },
    {
      p_name: "Acer Webcams Max 642",
      p_cat: "WEBCAMS",
      p_cost: 1899.39,
    },
    {
      p_name: "Sony Desktop Max 473",
      p_cat: "DESKTOP",
      p_cost: 465.93,
    },
    {
      p_name: "Dell Microphones Series X 832",
      p_cat: "MICROPHONES",
      p_cost: 1731.49,
    },
    {
      p_name: "Creative Pc Slim 344",
      p_cat: "PC",
      p_cost: 1066.11,
    },
    {
      p_name: "HP Ssd Max 704",
      p_cat: "SSD",
      p_cost: 616.5,
    },
    {
      p_name: "Dell Ssd Flex 358",
      p_cat: "SSD",
      p_cost: 904.45,
    },
    {
      p_name: "Lenovo Keyboards Prime 446",
      p_cat: "KEYBOARDS",
      p_cost: 792.01,
    },
    {
      p_name: "Canon Speakers Series S 109",
      p_cat: "SPEAKERS",
      p_cost: 1043.6,
    },
    {
      p_name: "Canon Keyboards Max 473",
      p_cat: "KEYBOARDS",
      p_cost: 1860.59,
    },
    {
      p_name: "Sony Tablets Neo 680",
      p_cat: "TABLETS",
      p_cost: 56.65,
    },
    {
      p_name: "Samsung Webcams Flex 774",
      p_cat: "WEBCAMS",
      p_cost: 511.37,
    },
    {
      p_name: "Sony Hard_Drives Edge 246",
      p_cat: "HARD_DRIVES",
      p_cost: 1894.32,
    },
    {
      p_name: "Acer Hard_Drives Edge 954",
      p_cat: "HARD_DRIVES",
      p_cost: 1482.01,
    },
    {
      p_name: "Razer Laptop Plus 541",
      p_cat: "LAPTOP",
      p_cost: 1312.99,
    },
    {
      p_name: "Sony Microphones Flex 593",
      p_cat: "MICROPHONES",
      p_cost: 1281.31,
    },
    {
      p_name: "Canon Keyboards Ultra 586",
      p_cat: "KEYBOARDS",
      p_cost: 1872.33,
    },
    {
      p_name: "Epson Webcams Slim 69",
      p_cat: "WEBCAMS",
      p_cost: 1011.17,
    },
    {
      p_name: "Logitech Headsets Plus 47",
      p_cat: "HEADSETS",
      p_cost: 934.35,
    },
    {
      p_name: "Canon Webcams Series S 26",
      p_cat: "WEBCAMS",
      p_cost: 1172.07,
    },
    {
      p_name: "Microsoft Printers Plus 83",
      p_cat: "PRINTERS",
      p_cost: 602.43,
    },
    {
      p_name: "Dell Projectors Series S 714",
      p_cat: "PROJECTORS",
      p_cost: 213.5,
    },
    {
      p_name: "Lenovo Monitors Essential 40",
      p_cat: "MONITORS",
      p_cost: 1470.78,
    },
    {
      p_name: "Sony Ssd Edge 82",
      p_cat: "SSD",
      p_cost: 244.45,
    },
    {
      p_name: "Asus Ssd Air 827",
      p_cat: "SSD",
      p_cost: 1828.15,
    },
    {
      p_name: "MSI Keyboards Edge 90",
      p_cat: "KEYBOARDS",
      p_cost: 808.08,
    },
    {
      p_name: "Creative Ssd Ultra 134",
      p_cat: "SSD",
      p_cost: 746.13,
    },
    {
      p_name: "Epson Microphones Pro 765",
      p_cat: "MICROPHONES",
      p_cost: 1768.05,
    },
    {
      p_name: "Canon Headsets Series S 698",
      p_cat: "HEADSETS",
      p_cost: 718.76,
    },
    {
      p_name: "Creative Ssd Air 821",
      p_cat: "SSD",
      p_cost: 1008.18,
    },
    {
      p_name: "Canon Webcams Compact 533",
      p_cat: "WEBCAMS",
      p_cost: 542.06,
    },
    {
      p_name: "MSI Pc Pro 835",
      p_cat: "PC",
      p_cost: 1503.21,
    },
    {
      p_name: "Asus Pc Neo 298",
      p_cat: "PC",
      p_cost: 600.27,
    },
    {
      p_name: "Razer Desktop Pro 914",
      p_cat: "DESKTOP",
      p_cost: 1764.34,
    },
    {
      p_name: "Acer Tablets Plus 664",
      p_cat: "TABLETS",
      p_cost: 1977.83,
    },
    {
      p_name: "Samsung Headsets Neo 108",
      p_cat: "HEADSETS",
      p_cost: 101.01,
    },
    {
      p_name: "Canon Mouses Series X 780",
      p_cat: "MOUSES",
      p_cost: 1736.82,
    },
    {
      p_name: "HP Tablets Ultra 99",
      p_cat: "TABLETS",
      p_cost: 179.44,
    },
    {
      p_name: "Acer Webcams Series X 128",
      p_cat: "WEBCAMS",
      p_cost: 1245.78,
    },
    {
      p_name: "MSI Laptop Prime 206",
      p_cat: "LAPTOP",
      p_cost: 1695.08,
    },
    {
      p_name: "Microsoft Scanners Plus 726",
      p_cat: "SCANNERS",
      p_cost: 674.42,
    },
    {
      p_name: "Canon Projectors Flex 457",
      p_cat: "PROJECTORS",
      p_cost: 134.33,
    },
    {
      p_name: "Razer Keyboards Essential 520",
      p_cat: "KEYBOARDS",
      p_cost: 1017.67,
    },
    {
      p_name: "Samsung Webcams Series X 266",
      p_cat: "WEBCAMS",
      p_cost: 109.78,
    },
    {
      p_name: "MSI Keyboards Flex 486",
      p_cat: "KEYBOARDS",
      p_cost: 729.37,
    },
    {
      p_name: "Samsung Pc Pro 511",
      p_cat: "PC",
      p_cost: 1858.86,
    },
    {
      p_name: "Logitech Laptop Edge 37",
      p_cat: "LAPTOP",
      p_cost: 411.09,
    },
    {
      p_name: "Samsung Scanners Ultra 740",
      p_cat: "SCANNERS",
      p_cost: 1346.9,
    },
    {
      p_name: "MSI Monitors Essential 832",
      p_cat: "MONITORS",
      p_cost: 1751.65,
    },
    {
      p_name: "Epson Monitors Prime 229",
      p_cat: "MONITORS",
      p_cost: 170.83,
    },
    {
      p_name: "Creative Projectors Neo 895",
      p_cat: "PROJECTORS",
      p_cost: 310.53,
    },
    {
      p_name: "Sony Headsets Pro 577",
      p_cat: "HEADSETS",
      p_cost: 396.52,
    },
    {
      p_name: "Samsung Speakers Flex 509",
      p_cat: "SPEAKERS",
      p_cost: 203.42,
    },
    {
      p_name: "Creative Speakers Max 437",
      p_cat: "SPEAKERS",
      p_cost: 821.55,
    },
    {
      p_name: "Microsoft Webcams Max 168",
      p_cat: "WEBCAMS",
      p_cost: 684.51,
    },
    {
      p_name: "Razer Laptop Flex 720",
      p_cat: "LAPTOP",
      p_cost: 1032.1,
    },
    {
      p_name: "Epson Laptop Flex 480",
      p_cat: "LAPTOP",
      p_cost: 1520.0,
    },
    {
      p_name: "Razer Projectors Flex 412",
      p_cat: "PROJECTORS",
      p_cost: 91.0,
    },
    {
      p_name: "Lenovo Tablets Neo 873",
      p_cat: "TABLETS",
      p_cost: 786.77,
    },
    {
      p_name: "Samsung Ssd Flex 73",
      p_cat: "SSD",
      p_cost: 1287.19,
    },
    {
      p_name: "Microsoft Ssd Max 480",
      p_cat: "SSD",
      p_cost: 1843.11,
    },
    {
      p_name: "Lenovo Speakers Flex 711",
      p_cat: "SPEAKERS",
      p_cost: 398.23,
    },
    {
      p_name: "Sony Speakers Essential 859",
      p_cat: "SPEAKERS",
      p_cost: 1081.23,
    },
    {
      p_name: "HP Headsets Edge 723",
      p_cat: "HEADSETS",
      p_cost: 1592.39,
    },
    {
      p_name: "Sony Laptop Compact 147",
      p_cat: "LAPTOP",
      p_cost: 1486.73,
    },
    {
      p_name: "Asus Speakers Slim 72",
      p_cat: "SPEAKERS",
      p_cost: 1434.77,
    },
    {
      p_name: "Microsoft Hard_Drives Neo 60",
      p_cat: "HARD_DRIVES",
      p_cost: 607.36,
    },
    {
      p_name: "Canon Microphones Flex 272",
      p_cat: "MICROPHONES",
      p_cost: 1034.0,
    },
    {
      p_name: "Razer Ssd Flex 971",
      p_cat: "SSD",
      p_cost: 263.22,
    },
    {
      p_name: "Sony Hard_Drives Max 66",
      p_cat: "HARD_DRIVES",
      p_cost: 1141.04,
    },
    {
      p_name: "Samsung Headsets Slim 757",
      p_cat: "HEADSETS",
      p_cost: 1977.42,
    },
    {
      p_name: "Samsung Printers Ultra 73",
      p_cat: "PRINTERS",
      p_cost: 797.83,
    },
    {
      p_name: "Microsoft Desktop Ultra 354",
      p_cat: "DESKTOP",
      p_cost: 263.97,
    },
    {
      p_name: "Epson Speakers Air 422",
      p_cat: "SPEAKERS",
      p_cost: 530.89,
    },
    {
      p_name: "Samsung Monitors Essential 364",
      p_cat: "MONITORS",
      p_cost: 1600.39,
    },
    {
      p_name: "Razer Keyboards Ultra 144",
      p_cat: "KEYBOARDS",
      p_cost: 1385.35,
    },
    {
      p_name: "Razer Microphones Prime 399",
      p_cat: "MICROPHONES",
      p_cost: 1552.37,
    },
    {
      p_name: "Microsoft Tablets Pro 889",
      p_cat: "TABLETS",
      p_cost: 560.06,
    },
    {
      p_name: "Creative Headsets Prime 511",
      p_cat: "HEADSETS",
      p_cost: 1951.81,
    },
    {
      p_name: "Logitech Ssd Flex 337",
      p_cat: "SSD",
      p_cost: 278.03,
    },
    {
      p_name: "Microsoft Monitors Max 757",
      p_cat: "MONITORS",
      p_cost: 1095.16,
    },
    {
      p_name: "Acer Speakers Slim 306",
      p_cat: "SPEAKERS",
      p_cost: 1307.84,
    },
    {
      p_name: "MSI Ssd Edge 778",
      p_cat: "SSD",
      p_cost: 1679.37,
    },
    {
      p_name: "Epson Laptop Series X 827",
      p_cat: "LAPTOP",
      p_cost: 1523.91,
    },
    {
      p_name: "Dell Speakers Flex 896",
      p_cat: "SPEAKERS",
      p_cost: 871.98,
    },
    {
      p_name: "Razer Hard_Drives Edge 670",
      p_cat: "HARD_DRIVES",
      p_cost: 253.42,
    },
    {
      p_name: "Epson Hard_Drives Prime 191",
      p_cat: "HARD_DRIVES",
      p_cost: 1216.16,
    },
    {
      p_name: "Asus Headsets Series X 981",
      p_cat: "HEADSETS",
      p_cost: 102.45,
    },
    {
      p_name: "Canon Ssd Pro 790",
      p_cat: "SSD",
      p_cost: 568.2,
    },
    {
      p_name: "Acer Webcams Edge 367",
      p_cat: "WEBCAMS",
      p_cost: 1101.9,
    },
    {
      p_name: "Lenovo Projectors Plus 652",
      p_cat: "PROJECTORS",
      p_cost: 1426.9,
    },
    {
      p_name: "Microsoft Monitors Ultra 894",
      p_cat: "MONITORS",
      p_cost: 433.25,
    },
    {
      p_name: "Logitech Pc Slim 705",
      p_cat: "PC",
      p_cost: 1625.87,
    },
    {
      p_name: "MSI Projectors Prime 448",
      p_cat: "PROJECTORS",
      p_cost: 1342.01,
    },
    {
      p_name: "Acer Speakers Flex 397",
      p_cat: "SPEAKERS",
      p_cost: 1724.47,
    },
    {
      p_name: "MSI Speakers Slim 597",
      p_cat: "SPEAKERS",
      p_cost: 727.43,
    },
    {
      p_name: "Logitech Ssd Neo 176",
      p_cat: "SSD",
      p_cost: 225.87,
    },
    {
      p_name: "Razer Ssd Series S 891",
      p_cat: "SSD",
      p_cost: 1993.88,
    },
    {
      p_name: "Acer Monitors Prime 520",
      p_cat: "MONITORS",
      p_cost: 1143.04,
    },
    {
      p_name: "Samsung Webcams Slim 773",
      p_cat: "WEBCAMS",
      p_cost: 965.6,
    },
    {
      p_name: "Razer Desktop Neo 109",
      p_cat: "DESKTOP",
      p_cost: 1087.32,
    },
    {
      p_name: "Lenovo Pc Max 863",
      p_cat: "PC",
      p_cost: 536.84,
    },
    {
      p_name: "Acer Pc Air 92",
      p_cat: "PC",
      p_cost: 1026.45,
    },
    {
      p_name: "Dell Ssd Max 310",
      p_cat: "SSD",
      p_cost: 1343.66,
    },
    {
      p_name: "Acer Keyboards Essential 193",
      p_cat: "KEYBOARDS",
      p_cost: 1464.51,
    },
    {
      p_name: "Lenovo Microphones Slim 856",
      p_cat: "MICROPHONES",
      p_cost: 1601.07,
    },
    {
      p_name: "Asus Webcams Slim 917",
      p_cat: "WEBCAMS",
      p_cost: 895.11,
    },
    {
      p_name: "Microsoft Scanners Max 210",
      p_cat: "SCANNERS",
      p_cost: 799.65,
    },
    {
      p_name: "Logitech Ssd Max 649",
      p_cat: "SSD",
      p_cost: 1982.85,
    },
    {
      p_name: "HP Headsets Series S 973",
      p_cat: "HEADSETS",
      p_cost: 906.74,
    },
    {
      p_name: "Logitech Projectors Series S 241",
      p_cat: "PROJECTORS",
      p_cost: 1318.29,
    },
    {
      p_name: "Samsung Webcams Air 637",
      p_cat: "WEBCAMS",
      p_cost: 381.08,
    },
    {
      p_name: "Microsoft Tablets Prime 897",
      p_cat: "TABLETS",
      p_cost: 37.02,
    },
    {
      p_name: "Lenovo Desktop Series S 208",
      p_cat: "DESKTOP",
      p_cost: 1682.71,
    },
    {
      p_name: "Microsoft Pc Series X 302",
      p_cat: "PC",
      p_cost: 1432.78,
    },
    {
      p_name: "Razer Microphones Ultra 788",
      p_cat: "MICROPHONES",
      p_cost: 836.48,
    },
    {
      p_name: "Logitech Tablets Essential 11",
      p_cat: "TABLETS",
      p_cost: 1090.87,
    },
    {
      p_name: "MSI Monitors Series S 535",
      p_cat: "MONITORS",
      p_cost: 1381.97,
    },
    {
      p_name: "Canon Desktop Essential 731",
      p_cat: "DESKTOP",
      p_cost: 848.09,
    },
    {
      p_name: "Microsoft Tablets Essential 650",
      p_cat: "TABLETS",
      p_cost: 1138.12,
    },
    {
      p_name: "MSI Laptop Air 27",
      p_cat: "LAPTOP",
      p_cost: 704.62,
    },
    {
      p_name: "Lenovo Keyboards Pro 102",
      p_cat: "KEYBOARDS",
      p_cost: 161.1,
    },
    {
      p_name: "MSI Tablets Plus 401",
      p_cat: "TABLETS",
      p_cost: 1998.26,
    },
    {
      p_name: "Lenovo Hard_Drives Compact 446",
      p_cat: "HARD_DRIVES",
      p_cost: 816.85,
    },
    {
      p_name: "Asus Desktop Prime 968",
      p_cat: "DESKTOP",
      p_cost: 1878.73,
    },
    {
      p_name: "Creative Desktop Slim 507",
      p_cat: "DESKTOP",
      p_cost: 1843.26,
    },
    {
      p_name: "Samsung Headsets Flex 38",
      p_cat: "HEADSETS",
      p_cost: 250.66,
    },
    {
      p_name: "Razer Projectors Neo 348",
      p_cat: "PROJECTORS",
      p_cost: 682.68,
    },
    {
      p_name: "Lenovo Laptop Series S 721",
      p_cat: "LAPTOP",
      p_cost: 67.09,
    },
    {
      p_name: "Creative Desktop Compact 158",
      p_cat: "DESKTOP",
      p_cost: 773.98,
    },
    {
      p_name: "MSI Laptop Ultra 771",
      p_cat: "LAPTOP",
      p_cost: 1644.9,
    },
    {
      p_name: "Razer Webcams Max 157",
      p_cat: "WEBCAMS",
      p_cost: 835.34,
    },
    {
      p_name: "Razer Projectors Slim 726",
      p_cat: "PROJECTORS",
      p_cost: 581.63,
    },
    {
      p_name: "Lenovo Desktop Ultra 940",
      p_cat: "DESKTOP",
      p_cost: 1065.02,
    },
    {
      p_name: "Acer Headsets Air 189",
      p_cat: "HEADSETS",
      p_cost: 1426.91,
    },
    {
      p_name: "Sony Ssd Max 974",
      p_cat: "SSD",
      p_cost: 1333.91,
    },
    {
      p_name: "Razer Webcams Compact 295",
      p_cat: "WEBCAMS",
      p_cost: 20.7,
    },
    {
      p_name: "Sony Laptop Flex 72",
      p_cat: "LAPTOP",
      p_cost: 1869.29,
    },
    {
      p_name: "Samsung Mouses Series X 460",
      p_cat: "MOUSES",
      p_cost: 478.31,
    },
    {
      p_name: "Creative Hard_Drives Max 903",
      p_cat: "HARD_DRIVES",
      p_cost: 159.71,
    },
    {
      p_name: "Lenovo Monitors Neo 687",
      p_cat: "MONITORS",
      p_cost: 944.94,
    },
    {
      p_name: "HP Desktop Essential 134",
      p_cat: "DESKTOP",
      p_cost: 1399.46,
    },
    {
      p_name: "Acer Projectors Essential 855",
      p_cat: "PROJECTORS",
      p_cost: 1732.2,
    },
    {
      p_name: "MSI Webcams Essential 752",
      p_cat: "WEBCAMS",
      p_cost: 1075.8,
    },
    {
      p_name: "Sony Hard_Drives Max 246",
      p_cat: "HARD_DRIVES",
      p_cost: 413.5,
    },
    {
      p_name: "Logitech Scanners Series X 664",
      p_cat: "SCANNERS",
      p_cost: 915.5,
    },
    {
      p_name: "Lenovo Projectors Essential 716",
      p_cat: "PROJECTORS",
      p_cost: 1556.05,
    },
    {
      p_name: "Dell Monitors Essential 670",
      p_cat: "MONITORS",
      p_cost: 1876.2,
    },
    {
      p_name: "Creative Hard_Drives Neo 942",
      p_cat: "HARD_DRIVES",
      p_cost: 649.89,
    },
    {
      p_name: "Samsung Microphones Essential 831",
      p_cat: "MICROPHONES",
      p_cost: 1652.07,
    },
    {
      p_name: "Canon Printers Pro 828",
      p_cat: "PRINTERS",
      p_cost: 1356.17,
    },
    {
      p_name: "Asus Scanners Pro 53",
      p_cat: "SCANNERS",
      p_cost: 707.44,
    },
    {
      p_name: "Logitech Mouses Pro 42",
      p_cat: "MOUSES",
      p_cost: 926.42,
    },
    {
      p_name: "MSI Tablets Air 936",
      p_cat: "TABLETS",
      p_cost: 448.98,
    },
    {
      p_name: "Samsung Laptop Air 316",
      p_cat: "LAPTOP",
      p_cost: 1283.27,
    },
    {
      p_name: "Epson Keyboards Series X 253",
      p_cat: "KEYBOARDS",
      p_cost: 619.14,
    },
    {
      p_name: "Epson Projectors Plus 206",
      p_cat: "PROJECTORS",
      p_cost: 262.81,
    },
    {
      p_name: "Logitech Headsets Essential 302",
      p_cat: "HEADSETS",
      p_cost: 1576.88,
    },
    {
      p_name: "Epson Monitors Edge 405",
      p_cat: "MONITORS",
      p_cost: 1980.3,
    },
    {
      p_name: "Logitech Printers Essential 368",
      p_cat: "PRINTERS",
      p_cost: 482.88,
    },
    {
      p_name: "Sony Monitors Flex 268",
      p_cat: "MONITORS",
      p_cost: 1598.14,
    },
    {
      p_name: "Creative Hard_Drives Neo 723",
      p_cat: "HARD_DRIVES",
      p_cost: 1258.42,
    },
    {
      p_name: "Creative Headsets Ultra 327",
      p_cat: "HEADSETS",
      p_cost: 843.39,
    },
    {
      p_name: "Logitech Desktop Plus 58",
      p_cat: "DESKTOP",
      p_cost: 996.1,
    },
    {
      p_name: "Razer Mouses Series X 200",
      p_cat: "MOUSES",
      p_cost: 479.1,
    },
    {
      p_name: "Acer Monitors Neo 515",
      p_cat: "MONITORS",
      p_cost: 1660.87,
    },
    {
      p_name: "Microsoft Scanners Essential 482",
      p_cat: "SCANNERS",
      p_cost: 490.78,
    },
    {
      p_name: "Creative Monitors Max 30",
      p_cat: "MONITORS",
      p_cost: 833.02,
    },
    {
      p_name: "Sony Headsets Flex 129",
      p_cat: "HEADSETS",
      p_cost: 1676.07,
    },
    {
      p_name: "Lenovo Mouses Pro 756",
      p_cat: "MOUSES",
      p_cost: 1968.02,
    },
    {
      p_name: "Creative Pc Air 643",
      p_cat: "PC",
      p_cost: 1423.51,
    },
    {
      p_name: "Canon Keyboards Max 105",
      p_cat: "KEYBOARDS",
      p_cost: 1936.89,
    },
    {
      p_name: "Razer Hard_Drives Air 473",
      p_cat: "HARD_DRIVES",
      p_cost: 1642.05,
    },
    {
      p_name: "HP Headsets Air 260",
      p_cat: "HEADSETS",
      p_cost: 1413.12,
    },
    {
      p_name: "Logitech Printers Flex 638",
      p_cat: "PRINTERS",
      p_cost: 1408.23,
    },
    {
      p_name: "Epson Laptop Slim 939",
      p_cat: "LAPTOP",
      p_cost: 1614.79,
    },
    {
      p_name: "HP Headsets Ultra 544",
      p_cat: "HEADSETS",
      p_cost: 390.08,
    },
    {
      p_name: "HP Ssd Air 413",
      p_cat: "SSD",
      p_cost: 1097.41,
    },
    {
      p_name: "Asus Ssd Slim 589",
      p_cat: "SSD",
      p_cost: 852.97,
    },
    {
      p_name: "Asus Scanners Neo 171",
      p_cat: "SCANNERS",
      p_cost: 656.09,
    },
    {
      p_name: "Sony Laptop Essential 896",
      p_cat: "LAPTOP",
      p_cost: 1784.78,
    },
    {
      p_name: "Samsung Mouses Max 398",
      p_cat: "MOUSES",
      p_cost: 1999.54,
    },
    {
      p_name: "Acer Microphones Max 843",
      p_cat: "MICROPHONES",
      p_cost: 1725.74,
    },
    {
      p_name: "Razer Hard_Drives Flex 977",
      p_cat: "HARD_DRIVES",
      p_cost: 1629.76,
    },
    {
      p_name: "Dell Speakers Series X 749",
      p_cat: "SPEAKERS",
      p_cost: 103.19,
    },
    {
      p_name: "Razer Monitors Series S 477",
      p_cat: "MONITORS",
      p_cost: 182.06,
    },
    {
      p_name: "Razer Tablets Pro 645",
      p_cat: "TABLETS",
      p_cost: 1792.46,
    },
    {
      p_name: "Logitech Projectors Prime 722",
      p_cat: "PROJECTORS",
      p_cost: 1929.49,
    },
    {
      p_name: "Logitech Mouses Plus 270",
      p_cat: "MOUSES",
      p_cost: 708.54,
    },
    {
      p_name: "Logitech Headsets Flex 306",
      p_cat: "HEADSETS",
      p_cost: 1261.77,
    },
    {
      p_name: "Epson Speakers Edge 766",
      p_cat: "SPEAKERS",
      p_cost: 1888.09,
    },
    {
      p_name: "Razer Desktop Neo 412",
      p_cat: "DESKTOP",
      p_cost: 1964.51,
    },
    {
      p_name: "MSI Projectors Slim 296",
      p_cat: "PROJECTORS",
      p_cost: 688.48,
    },
    {
      p_name: "Asus Keyboards Flex 46",
      p_cat: "KEYBOARDS",
      p_cost: 643.82,
    },
    {
      p_name: "Sony Scanners Pro 890",
      p_cat: "SCANNERS",
      p_cost: 779.25,
    },
    {
      p_name: "Samsung Monitors Neo 721",
      p_cat: "MONITORS",
      p_cost: 47.85,
    },
    {
      p_name: "HP Laptop Max 694",
      p_cat: "LAPTOP",
      p_cost: 612.3,
    },
    {
      p_name: "Epson Monitors Pro 779",
      p_cat: "MONITORS",
      p_cost: 126.39,
    },
    {
      p_name: "MSI Mouses Compact 715",
      p_cat: "MOUSES",
      p_cost: 1895.75,
    },
    {
      p_name: "Lenovo Speakers Ultra 829",
      p_cat: "SPEAKERS",
      p_cost: 175.02,
    },
    {
      p_name: "MSI Desktop Plus 230",
      p_cat: "DESKTOP",
      p_cost: 1667.87,
    },
    {
      p_name: "Acer Monitors Prime 428",
      p_cat: "MONITORS",
      p_cost: 1520.51,
    },
    {
      p_name: "MSI Speakers Series X 578",
      p_cat: "SPEAKERS",
      p_cost: 1423.65,
    },
    {
      p_name: "Epson Microphones Slim 537",
      p_cat: "MICROPHONES",
      p_cost: 634.63,
    },
    {
      p_name: "Microsoft Printers Ultra 920",
      p_cat: "PRINTERS",
      p_cost: 1756.04,
    },
    {
      p_name: "Dell Hard_Drives Slim 816",
      p_cat: "HARD_DRIVES",
      p_cost: 1005.49,
    },
    {
      p_name: "Samsung Webcams Max 582",
      p_cat: "WEBCAMS",
      p_cost: 1845.45,
    },
    {
      p_name: "MSI Ssd Ultra 980",
      p_cat: "SSD",
      p_cost: 1077.68,
    },
    {
      p_name: "Dell Desktop Neo 799",
      p_cat: "DESKTOP",
      p_cost: 608.89,
    },
    {
      p_name: "Sony Microphones Neo 115",
      p_cat: "MICROPHONES",
      p_cost: 445.78,
    },
    {
      p_name: "Canon Monitors Series X 785",
      p_cat: "MONITORS",
      p_cost: 391.19,
    },
    {
      p_name: "Dell Headsets Compact 244",
      p_cat: "HEADSETS",
      p_cost: 1219.95,
    },
    {
      p_name: "Asus Mouses Pro 280",
      p_cat: "MOUSES",
      p_cost: 290.8,
    },
    {
      p_name: "MSI Desktop Series S 687",
      p_cat: "DESKTOP",
      p_cost: 1052.95,
    },
    {
      p_name: "Asus Speakers Essential 416",
      p_cat: "SPEAKERS",
      p_cost: 730.19,
    },
    {
      p_name: "Microsoft Tablets Prime 332",
      p_cat: "TABLETS",
      p_cost: 901.92,
    },
    {
      p_name: "Asus Monitors Series X 652",
      p_cat: "MONITORS",
      p_cost: 624.49,
    },
    {
      p_name: "Logitech Projectors Plus 338",
      p_cat: "PROJECTORS",
      p_cost: 1647.98,
    },
    {
      p_name: "Samsung Monitors Pro 243",
      p_cat: "MONITORS",
      p_cost: 1119.08,
    },
    {
      p_name: "Epson Headsets Essential 725",
      p_cat: "HEADSETS",
      p_cost: 1174.65,
    },
    {
      p_name: "HP Mouses Pro 361",
      p_cat: "MOUSES",
      p_cost: 960.23,
    },
    {
      p_name: "Samsung Webcams Flex 694",
      p_cat: "WEBCAMS",
      p_cost: 1698.06,
    },
    {
      p_name: "Creative Laptop Flex 112",
      p_cat: "LAPTOP",
      p_cost: 1952.86,
    },
    {
      p_name: "Acer Projectors Neo 543",
      p_cat: "PROJECTORS",
      p_cost: 128.86,
    },
    {
      p_name: "Lenovo Webcams Pro 794",
      p_cat: "WEBCAMS",
      p_cost: 1392.66,
    },
    {
      p_name: "Samsung Scanners Prime 74",
      p_cat: "SCANNERS",
      p_cost: 1982.14,
    },
    {
      p_name: "Lenovo Tablets Slim 492",
      p_cat: "TABLETS",
      p_cost: 955.92,
    },
    {
      p_name: "Razer Laptop Flex 175",
      p_cat: "LAPTOP",
      p_cost: 1665.36,
    },
    {
      p_name: "Asus Webcams Plus 713",
      p_cat: "WEBCAMS",
      p_cost: 108.0,
    },
    {
      p_name: "Microsoft Speakers Series S 263",
      p_cat: "SPEAKERS",
      p_cost: 1579.65,
    },
    {
      p_name: "Epson Headsets Edge 561",
      p_cat: "HEADSETS",
      p_cost: 1750.83,
    },
    {
      p_name: "Razer Tablets Edge 762",
      p_cat: "TABLETS",
      p_cost: 244.51,
    },
    {
      p_name: "Samsung Mouses Neo 4",
      p_cat: "MOUSES",
      p_cost: 1608.65,
    },
    {
      p_name: "Epson Microphones Compact 666",
      p_cat: "MICROPHONES",
      p_cost: 648.58,
    },
    {
      p_name: "Logitech Scanners Edge 260",
      p_cat: "SCANNERS",
      p_cost: 1356.67,
    },
    {
      p_name: "Sony Monitors Compact 649",
      p_cat: "MONITORS",
      p_cost: 1520.77,
    },
    {
      p_name: "Microsoft Mouses Ultra 956",
      p_cat: "MOUSES",
      p_cost: 1044.82,
    },
    {
      p_name: "Razer Laptop Air 410",
      p_cat: "LAPTOP",
      p_cost: 1011.66,
    },
    {
      p_name: "Logitech Printers Essential 232",
      p_cat: "PRINTERS",
      p_cost: 1271.74,
    },
    {
      p_name: "Asus Headsets Pro 324",
      p_cat: "HEADSETS",
      p_cost: 75.27,
    },
    {
      p_name: "Asus Scanners Essential 322",
      p_cat: "SCANNERS",
      p_cost: 1351.03,
    },
    {
      p_name: "MSI Printers Pro 205",
      p_cat: "PRINTERS",
      p_cost: 932.6,
    },
    {
      p_name: "Microsoft Keyboards Neo 201",
      p_cat: "KEYBOARDS",
      p_cost: 1937.35,
    },
    {
      p_name: "Asus Ssd Plus 932",
      p_cat: "SSD",
      p_cost: 1707.81,
    },
    {
      p_name: "Asus Hard_Drives Pro 561",
      p_cat: "HARD_DRIVES",
      p_cost: 385.83,
    },
    {
      p_name: "Lenovo Scanners Pro 528",
      p_cat: "SCANNERS",
      p_cost: 217.89,
    },
    {
      p_name: "Razer Headsets Neo 142",
      p_cat: "HEADSETS",
      p_cost: 573.81,
    },
    {
      p_name: "Acer Monitors Max 732",
      p_cat: "MONITORS",
      p_cost: 626.87,
    },
    {
      p_name: "Epson Ssd Series S 379",
      p_cat: "SSD",
      p_cost: 1737.94,
    },
    {
      p_name: "Epson Monitors Max 390",
      p_cat: "MONITORS",
      p_cost: 797.7,
    },
    {
      p_name: "Razer Laptop Prime 846",
      p_cat: "LAPTOP",
      p_cost: 25.29,
    },
    {
      p_name: "Asus Speakers Max 382",
      p_cat: "SPEAKERS",
      p_cost: 1509.75,
    },
    {
      p_name: "Acer Scanners Flex 899",
      p_cat: "SCANNERS",
      p_cost: 1892.54,
    },
    {
      p_name: "Acer Hard_Drives Ultra 383",
      p_cat: "HARD_DRIVES",
      p_cost: 1218.56,
    },
    {
      p_name: "Dell Laptop Pro 500",
      p_cat: "LAPTOP",
      p_cost: 531.4,
    },
    {
      p_name: "Razer Printers Pro 731",
      p_cat: "PRINTERS",
      p_cost: 1046.02,
    },
    {
      p_name: "Samsung Projectors Edge 19",
      p_cat: "PROJECTORS",
      p_cost: 1759.9,
    },
    {
      p_name: "Asus Pc Neo 690",
      p_cat: "PC",
      p_cost: 681.93,
    },
    {
      p_name: "HP Microphones Prime 807",
      p_cat: "MICROPHONES",
      p_cost: 96.0,
    },
    {
      p_name: "Razer Keyboards Pro 618",
      p_cat: "KEYBOARDS",
      p_cost: 1540.45,
    },
    {
      p_name: "Logitech Tablets Flex 422",
      p_cat: "TABLETS",
      p_cost: 1346.19,
    },
    {
      p_name: "Samsung Laptop Air 378",
      p_cat: "LAPTOP",
      p_cost: 24.38,
    },
    {
      p_name: "Samsung Webcams Air 461",
      p_cat: "WEBCAMS",
      p_cost: 793.22,
    },
    {
      p_name: "Epson Mouses Flex 264",
      p_cat: "MOUSES",
      p_cost: 1817.28,
    },
    {
      p_name: "Sony Hard_Drives Pro 951",
      p_cat: "HARD_DRIVES",
      p_cost: 1779.52,
    },
    {
      p_name: "Razer Desktop Air 562",
      p_cat: "DESKTOP",
      p_cost: 50.51,
    },
    {
      p_name: "HP Projectors Ultra 73",
      p_cat: "PROJECTORS",
      p_cost: 372.28,
    },
    {
      p_name: "Microsoft Keyboards Essential 602",
      p_cat: "KEYBOARDS",
      p_cost: 1122.94,
    },
    {
      p_name: "Microsoft Laptop Compact 636",
      p_cat: "LAPTOP",
      p_cost: 411.5,
    },
    {
      p_name: "Microsoft Scanners Edge 691",
      p_cat: "SCANNERS",
      p_cost: 592.7,
    },
    {
      p_name: "Sony Laptop Flex 399",
      p_cat: "LAPTOP",
      p_cost: 1975.33,
    },
    {
      p_name: "Logitech Printers Pro 219",
      p_cat: "PRINTERS",
      p_cost: 1533.67,
    },
    {
      p_name: "Razer Speakers Air 880",
      p_cat: "SPEAKERS",
      p_cost: 1919.85,
    },
    {
      p_name: "Samsung Printers Series X 203",
      p_cat: "PRINTERS",
      p_cost: 1746.21,
    },
    {
      p_name: "Sony Laptop Series S 987",
      p_cat: "LAPTOP",
      p_cost: 1826.93,
    },
    {
      p_name: "Epson Mouses Prime 915",
      p_cat: "MOUSES",
      p_cost: 472.93,
    },
    {
      p_name: "Razer Laptop Max 368",
      p_cat: "LAPTOP",
      p_cost: 1767.65,
    },
    {
      p_name: "MSI Keyboards Flex 597",
      p_cat: "KEYBOARDS",
      p_cost: 461.34,
    },
    {
      p_name: "Sony Keyboards Series X 942",
      p_cat: "KEYBOARDS",
      p_cost: 1322.15,
    },
    {
      p_name: "Creative Webcams Series S 706",
      p_cat: "WEBCAMS",
      p_cost: 1080.32,
    },
    {
      p_name: "Acer Printers Flex 71",
      p_cat: "PRINTERS",
      p_cost: 636.59,
    },
    {
      p_name: "MSI Printers Series S 326",
      p_cat: "PRINTERS",
      p_cost: 588.21,
    },
    {
      p_name: "Samsung Monitors Max 806",
      p_cat: "MONITORS",
      p_cost: 1138.55,
    },
    {
      p_name: "Epson Pc Plus 479",
      p_cat: "PC",
      p_cost: 639.78,
    },
  ];

  uploadSequentially();
  return new Response(JSON.stringify({ message: "Hello from Next.js GET!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
