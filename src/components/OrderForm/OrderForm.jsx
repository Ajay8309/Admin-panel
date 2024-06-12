import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Select, Button } from '@windmill/react-ui';
import PulseLoader from 'react-spinners/PulseLoader';
// import { useProduct } from '../../context/ProductContext';
import { useOrder } from '../../context/OrderContext';
import { useUser } from '../../context/UserContext';
import { useParams } from 'react-router-dom';
import s from './OrderForm.module.css';

const OrderForm = ({ orderData, setShowSettings, updateOrderStatus }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      status: orderData?.status || 'Pending',
    },
  });
  const [validationError, setValidationError] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const { updateStatus, order } = useOrder();
  const { authData } = useUser();
  const { id } = useParams();
  
  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      await updateStatus({
        ...data, 
        id
      });
      updateOrderStatus(data.status);
      setShowSettings(false);
    } catch (error) {
      console.error('Error updating product:', error);
      setValidationError('Failed to update the product.');
    } finally {
      setIsSaving(false);
    }
  };

  // Setting default value
  setValue('status', orderData?.status || 'Pending');

  return (
    <section className={s.productFormContainer}>
      <div className={s.productFormCard}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.formContainer}>
          <div className={s.inputContainer}>
            <div className={s.productFormLabel}>
              <div>Status</div>
              <Select
                name="status"
                {...register('status')}
                className={s.productFormInput}
                placeholder="Select status of the order"
              >
                <option value="Delivered">Delivered</option>
                <option value="In Transit">In Transit</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </Select>
            </div>
          </div>

          {validationError && <div className={s.error}>{validationError}</div>}

          <div>
            <Button disabled={isSaving} type="submit" className={s.saveButton}>
              {isSaving ? <PulseLoader color={"#0a138b"} size={10} loading={isSaving} /> : "Save Order"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
