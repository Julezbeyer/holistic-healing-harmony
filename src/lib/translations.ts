
export type Language = 'de' | 'en' | 'ar';

type TranslationKey = 
  | 'home'
  | 'booking'
  | 'selectDate'
  | 'selectTime' 
  | 'personalInfo'
  | 'name'
  | 'email'
  | 'phone'
  | 'notes'
  | 'submit'
  | 'cancel'
  | 'bookingSuccess'
  | 'bookingError'
  | 'availableTimeSlots'
  | 'noTimeSlotsAvailable'
  | 'Page not found'
  | 'about'
  | 'therapy'
  | 'contact'
  | 'login'
  | 'logout'
  | 'aboutUs'
  | 'therapyApproaches'
  | 'makeAppointment'
  | 'discover';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  de: {
    'home': 'Startseite',
    'booking': 'Termin buchen',
    'selectDate': 'Datum auswählen',
    'selectTime': 'Uhrzeit auswählen',
    'personalInfo': 'Persönliche Informationen',
    'name': 'Name',
    'email': 'E-Mail',
    'phone': 'Telefon',
    'notes': 'Anmerkungen',
    'submit': 'Absenden',
    'cancel': 'Abbrechen',
    'bookingSuccess': 'Buchung erfolgreich',
    'bookingError': 'Fehler bei der Buchung',
    'availableTimeSlots': 'Verfügbare Termine',
    'noTimeSlotsAvailable': 'Keine Termine verfügbar',
    'Page not found': 'Seite nicht gefunden',
    'about': 'Über Uns',
    'therapy': 'Therapieansätze',
    'contact': 'Kontakt',
    'login': 'Anmelden',
    'logout': 'Abmelden',
    'aboutUs': 'Über Uns',
    'therapyApproaches': 'Therapieansätze',
    'makeAppointment': 'Termin vereinbaren',
    'discover': 'Entdecken'
  },
  en: {
    'home': 'Home',
    'booking': 'Book Appointment',
    'selectDate': 'Select Date',
    'selectTime': 'Select Time',
    'personalInfo': 'Personal Information',
    'name': 'Name',
    'email': 'Email',
    'phone': 'Phone',
    'notes': 'Notes',
    'submit': 'Submit',
    'cancel': 'Cancel',
    'bookingSuccess': 'Booking Successful',
    'bookingError': 'Booking Error',
    'availableTimeSlots': 'Available Time Slots',
    'noTimeSlotsAvailable': 'No Time Slots Available',
    'Page not found': 'Page not found',
    'about': 'About Us',
    'therapy': 'Therapy Approaches',
    'contact': 'Contact',
    'login': 'Login',
    'logout': 'Logout',
    'aboutUs': 'About Us',
    'therapyApproaches': 'Therapy Approaches',
    'makeAppointment': 'Make an Appointment',
    'discover': 'Discover'
  },
  ar: {
    'home': 'الصفحة الرئيسية',
    'booking': 'حجز موعد',
    'selectDate': 'اختر التاريخ',
    'selectTime': 'اختر الوقت',
    'personalInfo': 'المعلومات الشخصية',
    'name': 'الاسم',
    'email': 'البريد الإلكتروني',
    'phone': 'الهاتف',
    'notes': 'ملاحظات',
    'submit': 'إرسال',
    'cancel': 'إلغاء',
    'bookingSuccess': 'تم الحجز بنجاح',
    'bookingError': 'خطأ في الحجز',
    'availableTimeSlots': 'المواعيد المتاحة',
    'noTimeSlotsAvailable': 'لا توجد مواعيد متاحة',
    'Page not found': 'الصفحة غير موجودة',
    'about': 'من نحن',
    'therapy': 'أساليب العلاج',
    'contact': 'اتصل بنا',
    'login': 'تسجيل الدخول',
    'logout': 'تسجيل الخروج',
    'aboutUs': 'من نحن',
    'therapyApproaches': 'أساليب العلاج',
    'makeAppointment': 'حجز موعد',
    'discover': 'اكتشف'
  }
};
