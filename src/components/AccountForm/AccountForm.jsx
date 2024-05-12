import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PulseLoader from "react-spinners/PulseLoader";
import s from "./AccountForm.module.css";
import { toast } from "react-hot-toast";

const AccountForm = ({ setShowSettings, userData }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullname: userData?.fullname,
      email: userData?.email,
      username: userData?.username,
      address: userData?.address,
      country: userData?.country,
      city: userData?.city,
      state: userData?.state,
    },
  });
  const [validationError, setValidationError] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const { updateUserData } = useUser();

  // console.log(userData);

  const onSubmit = async (data) => {
    setValidationError();
    setIsSaving(true);
    try {
      await updateUserData(data);
      toast.success("User Details Saved");
      setShowSettings(false);
      setIsSaving(false);
    } catch (error) {
      toast.error("Details not saved");
      setIsSaving(false);
      setValidationError(error.response.data.message);
    }
  };

  return (
    <section className={s.accountFormContainer}>
      <div className={s.accountFormCard}>
       
        <form className={s.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <Label className={s.inputContainer}>
            <span className={`text-sm font-medium text-gray-500 ${s.accountFormLabelSpan}`}>Full name</span>
            <Input
              name="fullname"
              {...register("fullname")}
              className={s.input}
            />
          </Label>
          <Label className={s.inputContainer}>
            <span className={`text-sm font-medium text-gray-500 ${s.accountFormLabelSpan}`}>Username</span>
            <Input
              name="username"
              {...register("username")}
              className={s.input}
            />
            {validationError && <HelperText className={s.accountFormHelperText}>{validationError.username}</HelperText>}
          </Label>

          <div className={s.inputContainer}>
            <span className={`text-sm font-medium text-gray-500 ${s.accountFormLabelSpan}`}>Email address</span>
            <Input
              name="email"
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Email not valid",
                },
              })}
              className={s.input}
            />
            {validationError && <HelperText className={s.accountFormHelperText}>{validationError.email}</HelperText>}
          </div>
          <Label className={s.inputContainer}>
            <span className={`text-sm font-medium text-gray-500 ${s.accountFormLabelSpan}`}>Address</span>
            <Input
              name="address"
              {...register("address")}
              className={s.input}
            />
          </Label>
          <Label className={s.inputContainer}>
            <span className={`text-sm font-medium text-gray-500 ${s.accountFormLabelSpan}`}>City</span>
            <Input
              name="city"
              {...register("city")}
              className={s.input}
            />
          </Label>
          <Label className={s.inputContainer}>
            <span className={`text-sm font-medium text-gray-500 ${s.accountFormLabelSpan}`}>State</span>
            <Input
              name="state"
              {...register("state")}
              className={s.input}
            />
          </Label>
          <Label className={s.inputContainer}>
            <span className={`text-sm font-medium text-gray-500 ${s.accountFormLabelSpan}`}>Country</span>
            <Input
              name="country"
              {...register("country")}
              className={s.input}
            />
          </Label>
          <div className={s.formEdit}>
            <Button disabled={isSaving} type="submit" className={s.saveButton}>
              {isSaving ? <PulseLoader color={"#0a138b"} size={10} loading={isSaving} /> : "Save"}
            </Button>
            <Button
              disabled={isSaving}
              onClick={() => setShowSettings(false)}
              layout="outline"
              className={s.saveButton}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AccountForm;

