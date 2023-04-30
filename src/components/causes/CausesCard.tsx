import { HiSparkles } from "react-icons/hi";
import { useContext, useState, useEffect } from "react";
import { causesContext } from "@/context/CausesContext";
import { useFormik } from "formik";
import * as Yup from "yup";

interface ICauses {
  type: string;
  description: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface ICausesSchema {
  type: string;
}

interface MyProps {
  cause: ICauses;
}

export default function CausesCard({ cause }: MyProps) {
  const { updateCause } = useContext(causesContext);

  const [causeSchema, setCauseSchema] = useState<ICausesSchema>({
    type: cause.type || "",
  });

  const formik = useFormik({
    initialValues: { causeSchema },
    onSubmit: async (values) => {
      setCauseSchema(values.causeSchema);
      await updateCause(cause._id, values.causeSchema);
      console.log(values.causeSchema);
    },
    validateOnChange: true,
    validationSchema: Yup.object({
      causeSchema: Yup.object({
        type: Yup.string().required("Este campo es requerido"),
      }),
    }),
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (formik.values.causeSchema.type !== causeSchema.type) {
      timeoutId = setTimeout(() => {
        formik.handleSubmit();
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [formik.values.causeSchema.type]);

  return (
    <div className="rounded-md p-3 w-96 overflow-wrap break-word bg-white shadow-lg border-1 flex flex-col justify-start gap-x-2  gap-y-1 items-start text-xs">
      <div className="flex  justify-center items-center">
        <div className="p-1 border-1 rounded-full bg-gray-300">
          <HiSparkles />
        </div>
        <div>
          <form>
            <input
              className="inputCause"
              name="causeSchema.type"
              onBlur={formik.handleBlur}
              value={formik.values.causeSchema.type}
              onChange={formik.handleChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
