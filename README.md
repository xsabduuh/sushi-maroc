# 🍣 Sushi Maroc - E-commerce Website

## نظرة عامة على المشروع
موقع متكامل لبيع السوشي في المغرب مع نظام متقدم للطلبات والدفع والمستخدمين.

## الميزات الرئيسية
✅ واجهة مستخدم احترافية وسهلة الاستخدام
✅ نظام إدارة المنتجات
✅ سلة التسوق المتقدمة
✅ نظام الطلبات والتتبع
✅ نظام الدفع الآمن (Stripe)
✅ نظام التقييمات والآراء
✅ واجهة إدارة (Admin Panel)
✅ تصميم مستجيب (Responsive Design)

## المتطلبات
- Node.js (v14 أو أعلى)
- MongoDB
- npm أو yarn

## التثبيت والتشغيل

### 1. استنساخ المشروع
```bash
git clone https://github.com/xsabduuh/sushi-maroc.git
cd sushi-maroc
```

### 2. تثبيت الحزم
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. إعداد متغيرات البيئة
```bash
# في مجلد backend، أنشئ ملف .env
MONGODB_URI=mongodb://localhost:27017/sushi-maroc
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLIC_KEY=pk_test_your_key
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

### 4. تشغيل التطبيق
```bash
# تشغيل السيرفر (في مجلد backend)
npm run dev

# تشغيل الواجهة الأمامية (في مجلد frontend)
npm start
```

## هيكل المشروع
```
sushi-maroc/
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── User.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   └── package.json
├── .gitignore
└── README.md
```

## الواجهات الرئيسية

### Home Page
- عرض المنتجات
- تصفية حسب الفئة
- البحث عن المنتجات

### Product Details
- تفاصيل المنتج
- الصور والمكونات
- التقييمات والآراء

### Shopping Cart
- إضافة/إزالة المنتجات
- حساب الإجمالي
- المتابعة للدفع

### Checkout
- إدخال بيانات التوصيل
- اختيار طريقة الدفع
- تأكيد الطلب

## API Endpoints

### المنتجات
- `GET /api/products` - الحصول على جميع المنتجات
- `GET /api/products/:id` - الحصول على تفاصيل المنتج
- `POST /api/products` - إضافة منتج جديد (Admin)
- `PUT /api/products/:id` - تعديل المنتج (Admin)
- `DELETE /api/products/:id` - حذف المنتج (Admin)

### الطلبات
- `GET /api/orders` - الحصول على جميع الطلبات
- `GET /api/orders/:id` - الحصول على تفاصيل الطلب
- `POST /api/orders` - إنشاء طلب جديد
- `PUT /api/orders/:id` - تحديث حالة الطلب

### المستخدمين
- `POST /api/users/register` - تسجيل مستخدم جديد
- `POST /api/users/login` - تسجيل الدخول
- `GET /api/users/:id` - الحصول على بيانات المستخدم

### الدفع
- `POST /api/payment` - معالجة الدفع

## المساهمة
نرحب بمساهماتك! يرجى:
1. Fork المشروع
2. إنشاء فرع جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى الفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## الترخيص
هذا المشروع مرخص تحت MIT License

## التواصل
- 📧 البريد الإلكتروني: [بريدك]
- 📱 الهاتف: [رقمك]
- 📍 الموقع: الدار البيضاء، المغرب

---
تم إنشاؤه بـ ❤️ لأحبائنا محبي السوشي في المغرب
