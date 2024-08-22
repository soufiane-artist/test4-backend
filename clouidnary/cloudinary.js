const cloudinary =require('cloudinary')

// Configuration
cloudinary.config({
    cloud_name: 'dvivzto6g',
    api_key: '278544751172181',
    api_secret: 'SW9kj1R_mrR0GobNtLf9qoPPOnk'
});

// وظيفة لرفع الصور إلى Cloudinary
const cloudinaryUploadeImage = async(fileToUpload)=>{
    try {
        const data = await cloudinary.uploader.upload(fileToUpload , {
            resourse_type : 'auto',
        });
        return data; // إرجاع بيانات الصورة بعد الرفع
    } catch (error) {
        console.log(error)
        throw new Error("internal server error (cloudnary"); // إرجاع أي خطأ في حال حدوثه
    }
}

const cloudinaryRemoveImage = async (publicId) => {
    try {
        // محاولة لحذف الموارد باستخدام Cloudinary API
        const result = await cloudinary.v2.api.delete_resources(publicId);
        return result; // إرجاع نتيجة عملية الحذف
    } catch (error) {
        console.log(error);
        throw new Error("internal server error (cloudinary)"); // إرجاع أي خطأ في حال حدوثه
    }
};

// وظيفة لحذف الصور من Cloudinary
const cloudinaryRemoveAllImage = async(publicId)=>{
    try {
        const result = await cloudinary.v2.api.delete_resources(publicId)
        return result; // إرجاع نتيجة عملية الحذف
    } catch (error) {
        console.log(error)
        throw new Error("internal server error (cloudnary"); // إرجاع أي خطأ في حال حدوثه
 // إرجاع أي خطأ في حال حدوثه
    }
}

// تصدير الوظائف لتكون متاحة للاستخدام في ملفات أخرى
module.exports = {
    cloudinaryUploadeImage,
    cloudinaryRemoveImage,
    cloudinaryRemoveAllImage
}
