
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
  | 'Page not found';

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string;
  }
};

export const translations: Translations = {
  de: {
    home: 'Startseite',
    booking: 'Termin buchen',
    selectDate: 'Datum auswählen',
    selectTime: 'Uhrzeit auswählen',
    personalInfo: 'Persönliche Informationen',
    name: 'Name',
    email: 'E-Mail',
    phone: 'Telefon',
    notes: 'Anmerkungen',
    submit: 'Abschicken',
    cancel: 'Abbrechen',
    bookingSuccess: 'Buchung erfolgreich!',
    bookingError: 'Ein Fehler ist während der Buchung aufgetreten.',
    availableTimeSlots: 'Verfügbare Zeitfenster',
    noTimeSlotsAvailable: 'Keine Zeitfenster für das gewählte Datum verfügbar.',
    'Page not found': 'Seite nicht gefunden'
  },
  en: {
    home: 'Home',
    booking: 'Booking',
    selectDate: 'Select Date',
    selectTime: 'Select Time',
    personalInfo: 'Personal Information',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    notes: 'Notes',
    submit: 'Submit',
    cancel: 'Cancel',
    bookingSuccess: 'Booking successful!',
    bookingError: 'An error occurred during booking.',
    availableTimeSlots: 'Available Time Slots',
    noTimeSlotsAvailable: 'No time slots available for the selected date.',
    'Page not found': 'Page not found'
  },
  ar: {
    home: 'الرئيسية',
    booking: 'الحجز',
    selectDate: 'اختر التاريخ',
    selectTime: 'اختر الوقت',
    personalInfo: 'المعلومات الشخصية',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    notes: 'ملاحظات',
    submit: 'إرسال',
    cancel: 'إلغاء',
    bookingSuccess: 'تم الحجز بنجاح!',
    bookingError: 'حدث خطأ أثناء الحجز',
    availableTimeSlots: 'المواعيد المتاحة',
    noTimeSlotsAvailable: 'لا توجد مواعيد متاحة للتاريخ المحدد.',
    'Page not found': 'الصفحة غير موجودة'
  }
};
