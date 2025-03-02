
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
  | 'noTimeSlotsAvailable';

export type Language = 'en' | 'ar';

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string;
  }
};

export const translations: Translations = {
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
    noTimeSlotsAvailable: 'No time slots available for the selected date.'
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
    bookingError: 'حدث خطأ أثناء الحجز.',
    availableTimeSlots: 'الأوقات المتاحة',
    noTimeSlotsAvailable: 'لا توجد أوقات متاحة للتاريخ المحدد.'
  }
};
