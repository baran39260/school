# 🎲 سیستم قرعه‌کشی دانش‌آموز

این سیستم برای انتخاب تصادفی و هیجان‌انگیز دانش‌آموز پاسخ‌دهنده در کلاس 28 نفره طراحی شده است.

## 📦 فایل‌های سیستم

```
student-picker.css              → استایل‌ها
student-picker.js               → منطق و عملکرد
student-picker-template.html    → کد HTML برای کپی
```

---

## 🚀 نحوه استفاده در صفحات

### مرحله 1: اضافه کردن CSS

در بخش `<head>` صفحه HTML، **بعد از Vazir font**، این خط را اضافه کنید:

```html
<link rel="stylesheet" href="student-picker.css">
```

**مثال:**
```html
<head>
    <meta charset="UTF-8">
    <title>صفحه من</title>
    <link href="https://fonts.googleapis.com/css2?family=Vazir:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="student-picker.css">
    <!-- سایر استایل‌ها -->
</head>
```

---

### مرحله 2: اضافه کردن HTML

**قبل از تگ `</body>`**، کد زیر را اضافه کنید:

```html
<!-- Student Picker System -->
<button class="student-picker-btn" onclick="openStudentPicker()" title="انتخاب دانش‌آموز">🎲</button>

<div class="countdown-overlay" id="countdownOverlay">
    <div class="countdown-number" id="countdownNumber"></div>
</div>

<div class="winner-banner" id="winnerBanner">
    <h1>🎉 برنده شد! 🎉</h1>
    <div class="winner-number" id="winnerNumber"></div>
    <div class="winner-message">نوبت پاسخ دهی توست! 🎯</div>
    <button class="close-winner-btn" onclick="closeWinnerBanner()">متوجه شدم! 👍</button>
</div>

<div class="modal-overlay" id="studentModal">
    <div class="modal-content">
        <button class="close-modal" onclick="closeStudentPicker()">×</button>
        <div class="modal-header">
            <h2>انتخاب دانش‌آموز پاسخ‌دهنده 🎯</h2>
            <p>روی توپ کلیک کن یا دکمه قرعه‌کشی رو بزن!</p>
        </div>
        <div class="balls-container" id="ballsContainer"></div>
        <button class="pick-random-btn" id="pickRandomBtn" onclick="pickRandomStudent()">
            🎲 قرعه‌کشی تصادفی!
        </button>
        <div class="result-display" id="resultDisplay"></div>
    </div>
</div>
```

---

### مرحله 3: اضافه کردن JavaScript

**بعد از HTML قرعه‌کشی و قبل از `</body>`**، این خط را اضافه کنید:

```html
<script src="student-picker.js"></script>
```

---

### مرحله 4: اضافه کردن Confetti (اختیاری)

اگر می‌خواهید افکت confetti داشته باشید، **در اول `<body>`** این کد را اضافه کنید:

```html
<body>
    <canvas id="confetti"></canvas>
    <!-- سایر محتوا -->
</body>
```

---

## 📋 مثال کامل

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ریاضی - صفحه تمرین</title>
    
    <!-- Vazir Font -->
    <link href="https://fonts.googleapis.com/css2?family=Vazir:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Student Picker CSS -->
    <link rel="stylesheet" href="student-picker.css">
    
    <!-- سایر استایل‌های صفحه -->
    <style>
        /* استایل‌های خود صفحه */
    </style>
</head>
<body>
    <!-- Confetti Canvas -->
    <canvas id="confetti"></canvas>
    
    <!-- محتوای اصلی صفحه -->
    <div class="container">
        <h1>تمرینات ریاضی</h1>
        <!-- ... -->
    </div>
    
    <!-- Student Picker HTML -->
    <button class="student-picker-btn" onclick="openStudentPicker()" title="انتخاب دانش‌آموز">🎲</button>
    
    <div class="countdown-overlay" id="countdownOverlay">
        <div class="countdown-number" id="countdownNumber"></div>
    </div>
    
    <div class="winner-banner" id="winnerBanner">
        <h1>🎉 برنده شد! 🎉</h1>
        <div class="winner-number" id="winnerNumber"></div>
        <div class="winner-message">نوبت پاسخ دهی توست! 🎯</div>
        <button class="close-winner-btn" onclick="closeWinnerBanner()">متوجه شدم! 👍</button>
    </div>
    
    <div class="modal-overlay" id="studentModal">
        <div class="modal-content">
            <button class="close-modal" onclick="closeStudentPicker()">×</button>
            <div class="modal-header">
                <h2>انتخاب دانش‌آموز پاسخ‌دهنده 🎯</h2>
                <p>روی توپ کلیک کن یا دکمه قرعه‌کشی رو بزن!</p>
            </div>
            <div class="balls-container" id="ballsContainer"></div>
            <button class="pick-random-btn" id="pickRandomBtn" onclick="pickRandomStudent()">
                🎲 قرعه‌کشی تصادفی!
            </button>
            <div class="result-display" id="resultDisplay"></div>
        </div>
    </div>
    
    <!-- Student Picker JavaScript -->
    <script src="student-picker.js"></script>
    
    <!-- اسکریپت‌های خود صفحه -->
    <script>
        // کدهای JavaScript صفحه
    </script>
</body>
</html>
```

---

## ✅ چک‌لیست اعمال در صفحات

برای هر صفحه:

- [ ] `student-picker.css` در `<head>` اضافه شد
- [ ] `<canvas id="confetti"></canvas>` در اول `<body>` اضافه شد
- [ ] دکمه شناور قبل از `</body>` اضافه شد
- [ ] Countdown overlay اضافه شد
- [ ] Winner banner اضافه شد
- [ ] Modal اضافه شد
- [ ] `student-picker.js` قبل از `</body>` اضافه شد

---

## 🎯 لیست صفحات برای اعمال

- [ ] `index.html`
- [ ] `math.html`
- [ ] `multiplication_intro.html`
- [ ] `multiplication_intro2.html`
- [ ] `multiplication_intro3.html`
- [ ] `multiplication_intro4.html`
- [ ] `multiplication_intro5.html` (قبلاً اعمال شده)
- [ ] `saturday_math.html`
- [ ] `friday_math.html`
- [ ] `days.html`
- [ ] `time_learning.html`
- [ ] `science.html`
- [ ] `water_cycle.html`

---

## 🎨 سفارشی‌سازی

### تغییر تعداد دانش‌آموزان

اگر کلاس شما بیشتر یا کمتر از 28 نفر دارد:

در `student-picker.js` خط 110 را تغییر دهید:

```javascript
// قبل
for (let i = 1; i <= 28; i++) {

// بعد (برای مثال 30 نفر)
for (let i = 1; i <= 30; i++) {
```

### تغییر رنگ‌ها

در `student-picker.css`:
- دکمه شناور: خطوط 9-10
- توپ‌ها: خط 114
- Winner banner: خط 256

---

## 🐛 عیب‌یابی

### صدا پخش نمی‌شود
- مطمئن شوید کاربر یک بار کلیک کرده باشد (محدودیت مرورگر)
- Volume سیستم را چک کنید

### Confetti نمایش داده نمی‌شود
- مطمئن شوید `<canvas id="confetti"></canvas>` در صفحه وجود دارد

### توپ‌ها نمایش داده نمی‌شوند
- مطمئن شوید `student-picker.js` به درستی لود شده
- Console مرورگر را برای خطاها بررسی کنید

---

## 📱 پشتیبانی از موبایل

سیستم به طور کامل responsive است:
- Grid توپ‌ها: 7 ستون (desktop) → 4 ستون (mobile)
- اندازه توپ‌ها: 60px → 50px
- اندازه دکمه: 70px → 60px
- اندازه شمارش معکوس: 15rem → 8rem

---

## 💡 نکات مهم

1. **ترتیب اجرا مهم است**: CSS → HTML → JavaScript
2. **Vazir font باید قبل از student-picker.css لود شود**
3. **Canvas باید قبل از سایر محتوا باشد** (برای z-index)
4. **یک canvas در یک صفحه کافی است**

---

## 🎉 ویژگی‌ها

✨ انتخاب دستی (کلیک روی توپ)
🎲 قرعه‌کشی تصادفی با انیمیشن
🥁 صدای Drum Roll
⏱️ شمارش معکوس 3-2-1
💥 افشای هیجان‌انگیز برنده
🎊 3 موج Confetti
🎵 صداهای متنوع
📱 Responsive برای موبایل
♿ قابل دسترس
🌐 چندزبانه (فارسی)

---

## 📞 پشتیبانی

در صورت مشکل، این موارد را بررسی کنید:
1. Console مرورگر (F12)
2. مسیر فایل‌ها صحیح است
3. تمام فایل‌ها در پوشه درست قرار دارند
4. مرورگر به‌روز است

---

**ساخته شده با ❤️ برای معلمان و دانش‌آموزان ایرانی**

