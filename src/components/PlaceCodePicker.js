import { ScrollView, Pressable, Text } from "react-native"
import { R, C, centerStyle } from "./layout"
import { CODES } from '../util/places'

function FindButton({code, text, selected, onPress}) {
  return <Pressable style={{marginRight: 10}} onPress={() => onPress(code)}>
    <C style={[centerStyle, {padding: 5, borderRadius: 25 /* equal to this padding plus the inside's border radius*/, borderColor: code === selected ? "white" : (0, 0, 0, 0), borderWidth: 3}]}>
      <C style={{justifyContent: "center", alignItems: "center", borderRadius: 20, backgroundColor: "white", padding: 10}}>
        <Text style={{fontWeight: "bold", fontSize: 20}}>{text}</Text>
      </C>
    </C>
  </Pressable>
}

const displayData = [
  {
    code: CODES.MOSQUES,
    en: "Mosques",
    ar: "مسجد"
  },
  {
    code: CODES.HALAL_GROCERY,
    en: "Halal Grocery",
    ar: "بقالة حلال"
  },
  {
    code: CODES.HALAL_RESTAURANTS,
    en: "Halal Restaurants",
    ar: "مطاعم حلال"
  },
  {
    code: CODES.ISLAMIC_CLOTHING,
    en: "Islamic Clothing",
    ar: "الملابس الإسلامية"
  },
  {
    code: CODES.GENERAL_CLOTHING,
    en: "General Clothing",
    ar: "الملابس العامة"
  },
  {
    code: CODES.BUS_STATIONS,
    en: "Bus Stations",
    ar: "محطة الباص"
  },
  {
    code: CODES.PARKS,
    en: "Parks",
    ar: "حديقة عامة"
  },
  {
    code: CODES.MEDICAL,
    en: "Medical",
    ar: "طبي"
  },
  {
    code: CODES.BANKS,
    en: "Banks",
    ar: "ﻣَﺼﺮِﻑ"
  },
  {
    code: CODES.GOVERNMENT_OFFICES,
    en: "Government Offices",
    ar: "المكاتب الحكومية"
  },
  {
    code: CODES.HOUSING_ASSISTANCE,
    en: "Housing Assistance",
    ar: "مساعدة السكن"
  },
]

export default function PlaceCodePicker({selected, onPress}) {
  return <ScrollView style={{padding: 10}} horizontal={true} showsHorizontalScrollIndicator={false}>
    <R style={{justifyContent: "space-around", alignItems: "center"}}>
      {displayData.map((item, i) =>
        <FindButton key={i} text={item.en + " " + item.ar} code={item.code} selected={selected} onPress={onPress}/>
      )}
    </R>
  </ScrollView>
}
