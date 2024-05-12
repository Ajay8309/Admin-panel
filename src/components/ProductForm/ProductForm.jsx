import { Button, HelperText, Input, Label, Select } from "@windmill/react-ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PulseLoader from "react-spinners/PulseLoader";
import s from "./ProductForm.module.css";
import { useProduct } from "../../context/ProductContext"; 
import { toast } from "react-hot-toast";

const ProductForm = ({ setShowSettings, productData }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: productData?.name,
      price: productData?.price,
      description: productData?.description,
      category_name: productData?.category_name,
      material_type_name: productData?.material_type_name,
      weight: productData?.weight,
    },
  });
  const [validationError, setValidationError] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const {updateProductData, product} = useProduct();

  const onSubmit = async (data) => {
    setValidationError();
    setIsSaving(true);
    try {
      // console.log(data);
      await updateProductData(data);
      toast.success("Saved details");
      setShowSettings(false);
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
      setValidationError(error.response.data.message);
    }
  };

  // console.log(product);

  
  
  return (
    <section className={s.productFormContainer}>
      <div className={s.productFormCard}>
       
        <form onSubmit={handleSubmit(onSubmit)} className={s.formContainer}>
  <div>
    <div className={s.dropZone}>
      Click here to upload Image of Product
      <input
        type="file"
        name="file"
        // ref={fileInputRef}
        // onChange={(e) => {
        //   setSelectedFile(e.target.files[0]);
        // }}
      />
    </div>
  </div>
  <div className={s.inputContainer}>
    <div className={s.productFormLabel}>
      <div>Name</div>
      <Input
        name="name"
        {...register("name")}
        className={s.productFormInput}
        placeholder="Enter name of the Product"
      />
    </div>
  </div>
  <div className={s.inputContainer}>
    <div className={s.productFormLabel}>
    <div>Description</div>
      <Input
        name="description"
        {...register("description")}
        className={s.productFormInput}
        placeholder="Enter the description for the product"
      />
      {validationError && <HelperText className={s.productFormHelperText}>{validationError.description}</HelperText>}
    </div>
  </div>
  <div className={s.inputContainer}>
    <div>Weight</div>
    <Input
      name="weight"
      {...register("weight")}
      className={s.productFormInput}
      type="text"
      placeholder="Enter the weight of the product"
    />
  </div>
  <div className={s.inputContainer}>
    <div>Category</div>
    <Input
      name="category"
      {...register("category_name")}
      className={s.productFormInput}
      type="text"
      placeholder="Enter the Category of the product"
    />
  </div>
  <div className={s.inputContainer}>
    <div>Metal</div>
    <Input
      name="material"
      {...register("material_type_name")}
      className={s.productFormInput}
      type="text"
      placeholder="Enter the Metal type of the product"
    />
  </div>
  <div>
    <Button disabled={isSaving} type="submit" className={s.saveButton}>
      {isSaving ? <PulseLoader color={"#0a138b"} size={10} loading={isSaving} /> : "Save Product"}
    </Button>
  </div>
</form>

      </div>
    </section>
  );
};

export default ProductForm;