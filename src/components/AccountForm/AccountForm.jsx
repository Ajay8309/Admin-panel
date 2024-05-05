import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PulseLoader from "react-spinners/PulseLoader";
import s from "./AccountForm.module.css";

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

  const onSubmit = async (data) => {
    setValidationError();
    setIsSaving(true);
    try {
      await updateUserData(data);
      setShowSettings(false);
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
      setValidationError(error.response.data.message);
    }
  };

  return (
    <section className={s.accountFormContainer}>
      <div className={s.accountFormCard}>
        <div className={s.accountFormHeader}>
          <h3 className={s.accountFormTitle}>Account settings</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={s.accountFormContent}>
          <Label className={s.accountFormLabel}>
            <span className={`text-sm font-medium text-gray-500 ${s.accountFormLabelSpan}`}>Full name</span>
            <Input
              name="fullname"
              {...register("fullname")}
              className={s.accountFormInput}
            />
          </Label>
          <Label className={s.accountFormLabel}>
            <span className={`text-sm font-medium text-gray-500 ${s.accountFormLabelSpan}`}>Username</span>
            <Input
              name="username"
              {...register("username")}
              className={s.accountFormInput}
            />
            {validationError && <HelperText className={s.accountFormHelperText}>{validationError.username}</HelperText>}
          </Label>
          <div className={s.accountFormLabel}>
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
              className={s.accountFormInput}
            />
            {validationError && <HelperText className={s.accountFormHelperText}>{validationError.email}</HelperText>}
          </div>
          <Label className={s.accountFormLabel}>
            <span className={`text-sm font-medium text-gray-500 ${s.accountFormLabelSpan}`}>Address</span>
            <Input
              name="address"
              {...register("address")}
              className={s.accountFormInput}
            />
          </Label>
          <Label className={s.accountFormLabel}>
            <span className={`text-sm font-medium text-gray-500 ${s.accountFormLabelSpan}`}>City</span>
            <Input
              name="city"
              {...register("city")}
              className={s.accountFormInput}
            />
          </Label>
          <Label className={s.accountFormLabel}>
            <span className={`text-sm font-medium text-gray-500 ${s.accountFormLabelSpan}`}>State</span>
            <Input
              name="state"
              {...register("state")}
              className={s.accountFormInput}
            />
          </Label>
          <Label className={s.accountFormLabel}>
            <span className={`text-sm font-medium text-gray-500 ${s.accountFormLabelSpan}`}>Country</span>
            <Input
              name="country"
              {...register("country")}
              className={s.accountFormInput}
            />
          </Label>
          <div className={s.accountFormActions}>
            <Button disabled={isSaving} type="submit" className={s.accountFormButton}>
              {isSaving ? <PulseLoader color={"#0a138b"} size={10} loading={isSaving} /> : "Save"}
            </Button>
            <Button
              disabled={isSaving}
              onClick={() => setShowSettings(false)}
              layout="outline"
              className={s.accountFormButtonOutline}
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
