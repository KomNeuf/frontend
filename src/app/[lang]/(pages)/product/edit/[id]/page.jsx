"use client";
import langs from "@/app/[lang]/dictionaries/langs";
import withAuth from "@/app/middleware/withAuth";
import Loading from "@/components/Loading";
import api from "@/redux/api";
import { NavCategoriesWithSizes } from "@/utils/data";
import { ChevronDownIcon, PlusIcon, TrashIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { brands } from "@/utils/mockData";
import ConditionDropdown from "@/components/sell/ConditionDropdown";
import ColorTagInput from "@/components/sell/ColorTagInput";

const EditProduct = () => {
  const pathname = usePathname();
  const productId = pathname.split("/")[4];
  const lang = pathname?.split("/")[1];
  const t = langs[lang]?.editProduct;
  const [updateProduct, { isLoading }] =
    api.adminApis.useUpdateProductMutation();
  const { data: productData, isLoading: loadingProduct } =
    api.adminApis.useGetProductByIdQuery(productId, {
      skip: !productId,
    });

  const router = useRouter();
  const loginUser = useSelector((state) => state.auth.loginUser);

  const [formData, setFormData] = useState({
    photos: [],
    title: "",
    description: "",
    category: "",
    subcategory: "",
    specificItem: "",
    brand: "",
    size: "",
    condition: "",
    color: [],
    materials: "",
    quantity: 1,
    price: "",
    shippingOffer: false,
  });

  const [errors, setErrors] = useState({});
  const [subcategories, setSubcategories] = useState([]);
  const [specificItems, setSpecificItems] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    if (productData) {
      setFormData({
        photos: productData.photos.map((photo) => ({
          file: null,
          preview: photo,
        })),
        title: productData.title,
        description: productData.description,
        category: productData.category,
        subcategory: productData.subcategory,
        specificItem: productData.specificItem,
        brand: productData.brand,
        size: productData.size,
        condition: productData.condition,
        color: productData?.color ? productData?.color?.split(",") : [],
        materials: productData.materials,
        price: productData.price,
        shippingOffer: productData.shippingOffer,
        quantity: productData.quantity,
      });

      const selectedCategory = NavCategoriesWithSizes.find(
        (category) => category.slug === productData.category
      );
      setSubcategories(selectedCategory ? selectedCategory.subcategories : []);

      const selectedSubcategory = selectedCategory?.subcategories.find(
        (subcat) => subcat.name === productData.subcategory
      );
      setSpecificItems(
        selectedSubcategory ? selectedSubcategory.subcategories : []
      );
    }
  }, [productData]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));

    if (id === "category") {
      const selectedCategory = NavCategoriesWithSizes.find(
        (category) => category.slug === value
      );
      setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
      setFormData((prevData) => ({
        ...prevData,
        subcategory: "",
        specificItem: "",
      }));
      setSpecificItems([]);
    }

    if (id === "subcategory") {
      const selectedSubcategory = subcategories.find(
        (subcat) => subcat.name === value
      );
      setSpecificItems(
        selectedSubcategory ? selectedSubcategory.subcategories : []
      );
      setFormData((prevData) => ({
        ...prevData,
        specificItem: "",
      }));
    }
    if (id === "specificItem") {
      const selectedItem = specificItems.find((item) => item.name === value);

      if (selectedItem) {
        setSizes(selectedItem.sizes);
      } else {
        setSizes([]);
      }

      setFormData((prevData) => ({
        ...prevData,
        specificItem: value,
        size: "",
      }));
    }
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setFormData((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, ...newPhotos],
      }));
    }
  };

  const handleRemovePhoto = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      photos: prevData.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title) newErrors.title = t?.titleError;
    if (!formData.price) newErrors.price = t?.priceError;
    if (!formData.size) newErrors.size = t?.sizeRequired;
    if (!formData.category) newErrors.category = t?.categoryError;
    if (!formData.condition) newErrors.condition = t?.conditionError;
    if (!formData.subcategory) newErrors.subcategory = t?.subcategoryError;
    if (formData.photos.length === 0) newErrors.photos = t?.photosRequired;
    if (!formData.description) newErrors.description = t?.descriptionError;
    if (!formData.specificItem) newErrors.specificItem = t?.specificItemError;
    // if (!formData.shippingCost) newErrors.shippingCost = t?.shippingCostError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const form = new FormData();
        form.append("userId", loginUser?._id);

        Object.keys(formData).forEach((key) => {
          if (key === "photos") {
            formData.photos.forEach((photo) => {
              if (photo.file) form.append("photos", photo.file);
            });
          } else {
            form.append(key, formData[key]);
          }
        });

        const response = await updateProduct({ productId, formData: form });
        if (response.data.success) {
          toast.success(t?.successMessage);
          router.push(`/${lang}/product/${productId}`);
        }
      } catch (err) {
        toast.error(t?.errorMessage);
      }
    }
  };
  const handleColorChange = (newColors) => {
    setFormData((prev) => ({ ...prev, color: newColors }));
  };

  if (loadingProduct) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-4 my-6">
      <h1 className="text-2xl font-bold mb-4">{t?.pageTitle}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 border-2 border-dashed border-gray-300 p-4 rounded-lg">
          <div className="grid grid-cols-4 gap-2 mb-2">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo.preview}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
                  onClick={() => handleRemovePhoto(index)}
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <label className="flex items-center justify-center p-2 bg-primaryText text-white rounded cursor-pointer hover:bg-primaryText/80">
            <PlusIcon className="w-5 h-5 mr-2" />
            {t?.uploadPhotos}
            <input
              type="file"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
              accept="image/*"
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">{t?.addPhotosNote}</p>
          {errors.photos && (
            <p className="text-red-500 text-xs">{errors.photos}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t?.title}
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder={t?.titlePlaceholder}
            className="w-full p-2 border rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t?.description}
          </label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            placeholder={t?.descriptionPlaceholder}
            className="w-full p-2 border rounded"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t?.category}
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded appearance-none"
            >
              <option value="">{t?.categoryPlaceholder}</option>
              {NavCategoriesWithSizes.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category?.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="subcategory"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t?.subcategory}
            </label>
            <select
              id="subcategory"
              value={formData.subcategory}
              onChange={handleInputChange}
              className="w-full p-2 border rounded appearance-none"
            >
              <option value="">{t?.subcategoryPlaceholder}</option>
              {subcategories.map((subcat) => (
                <option key={subcat.name} value={subcat.name}>
                  {subcat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="specificItem"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t?.specificItem}
            </label>
            <select
              id="specificItem"
              value={formData.specificItem}
              onChange={handleInputChange}
              className="w-full p-2 border rounded appearance-none"
            >
              <option value="">{t?.specificItemPlaceholder}</option>
              {specificItems?.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.specificItem && (
              <p className="text-red-500 text-xs">{errors.specificItem}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t?.brand}
            </label>

            <select
              id="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">{t?.selectBrand}</option>
              {brands?.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="size"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t?.size}
            </label>
            {sizes.length > 0 ? (
              <div className="relative">
                <select
                  id="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded appearance-none"
                >
                  <option value="">{t?.sizePlaceholder}</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            ) : (
              <input
                type="text"
                id="size"
                value={formData.size}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            )}

            {errors.size && (
              <p className="text-red-500 text-xs">{errors.size}</p>
            )}
          </div>
          <div>
            <ConditionDropdown
              trans={t}
              formData={formData}
              handleInputChange={(value) =>
                setFormData({ ...formData, condition: value })
              }
              errors={errors}
            />
          </div>
          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t?.color}
            </label>

            <ColorTagInput
              colors={formData.color}
              onChange={handleColorChange}
            />
          </div>
          <div>
            <label
              htmlFor="materials"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t?.materials}
            </label>
            <input
              type="text"
              id="materials"
              value={formData.materials}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t?.quantityLabel}
            </label>
            <input
              type="number"
              id="quantity"
              value={formData.quantity}
              min="0"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t?.price}
            </label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder={t?.pricePlaceholder}
            />
            {errors.price && (
              <p className="text-red-500 text-xs">{errors.price}</p>
            )}
          </div>
        </div>
        <div className="flex  justify-between flex-wrap">
          <div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="shippingOffer"
                checked={formData.shippingOffer}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label
                htmlFor="shippingOffer"
                className="text-sm font-medium text-gray-700"
              >
                {t?.offerLable}
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className=" px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primaryText hover:bg-primaryText/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryText"
              disabled={isLoading}
            >
              {isLoading ? t?.updatingButton : t?.updateButton}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withAuth(EditProduct);
