import { InputText } from "primereact/inputtext";
import { Fieldset } from "primereact/fieldset";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { FormEvent, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
// import { Message } from "primereact/message";

// type FormInput = {
//   name: string;
//   address: string;
//   state: string;
//   city: string;
//   phone: number;
//   email: string;
//   age: number;
//   gender: string;
//   hobbies: string[];
//   education: EducationDataType;
// };

type EducationDataType = {
  institute: string;
  year: number;
  course: "10th" | "12th" | "BCom" | "MBA" | "BCA" | "BTech" | "MCA" | "BSc";
};

const COURSES = ["10th", "12th", "BCom", "MBA", "BCA", "BTech", "MCA", "BSc"];

const GENDERS = ["Male", "Female", "TransGender", "Others"];

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

const HOBBIES = ["h1", "h2", "h3"];

const legendTemplate = (
  <div className="text-3xl font-bold">Enter Your Information</div>
);

const Page = () => {
  // const {
  //   register,
  //   watch,
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormInput>();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState<null | number>();
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<null | number>();
  const [gender, setGender] = useState("");
  const [selectedHobbies, setSelectedHobbies] = useState();
  const [educationDialog, setEducationDialog] = useState(false);
  // const [emailError, setEmailError] = useState(false);

  const [educationData, setEducationData] = useState<EducationDataType[]>([
    {
      institute: "test",
      year: 2024,
      course: "12th",
    },
  ]);
  const [singleEducationData, setSingleEducationData] = useState({
    institute: "",
    year: null,
    course: "",
  });

  const [selectedEducationData, setSelectedEducationData] = useState<
    EducationDataType[]
  >([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      name,
      address,
      city,
      state,
      phone,
      email,
      age,
      gender,
      hobbies: selectedHobbies,
      education: educationData,
    };

    // localStorage.setItem("formData", JSON.stringify(formData));
    console.log(formData);
  };
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Add New"
          severity="success"
          type="button"
          onClick={addNewRow}
        />
        <Button
          label="Delete"
          severity="danger"
          type="button"
          // onClick={confirmDeleteSelected}
          disabled={!selectedEducationData || !selectedEducationData.length}
        />
      </div>
    );
  };

  const addNewRow = () => {
    setEducationDialog(true);
  };

  const hideDialog = () => {
    setSingleEducationData({
      institute: "",
      year: null,
      course: "",
    });
    setEducationDialog(false);
  };

  const instituteEditor = (options) => {
    return (
      <InputText
        className="w-full"
        value={options.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          options.editorCallback(e.target.value)
        }
      />
    );
  };

  const yearEditor = (options) => {
    return (
      <InputNumber
        maxLength={4}
        useGrouping={false}
        inputStyle={{ width: "100%" }}
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
      />
    );
  };

  const courseEditor = (options) => {
    return (
      <Dropdown
        className="w-full"
        options={COURSES}
        value={options.value}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select Course"
      />
    );
  };

  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
    let education = [...educationData];
    let { newData, index } = e;

    education[index] = newData as EducationDataType;

    setEducationData(education);
  };

  return (
    <>
      <div className="flex justify-center text-white p-10">
        <Fieldset legend={legendTemplate} className="max-w-4xl w-full">
          <form
            className="flex flex-col w-full p-6 gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <InputText
                className="focus:shadow-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="address">Address</label>
              <InputTextarea
                className="min-h-20 max-h-60 focus:shadow-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="state">State</label>
                <Dropdown
                  value={state}
                  onChange={(e) => setState(e.value)}
                  options={STATES}
                  placeholder="Select State"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="city">City</label>
                <Dropdown
                  editable
                  placeholder="Select City"
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="phone">Phone Number</label>
                <InputNumber
                  maxLength={10}
                  className="focus:shadow-none"
                  useGrouping={false}
                  value={phone}
                  onValueChange={(e) => setPhone(e.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email Address</label>
                <InputText
                  className="focus:shadow-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* {emailError && (
                <Message severity="error" text="Email is Invalid" />
              )} */}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="age">Age</label>
                <InputNumber
                  className="focus:shadow-none"
                  value={age}
                  onValueChange={(e) => setAge(e.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="gender">Gender</label>
                <Dropdown
                  value={gender}
                  options={GENDERS}
                  placeholder="Select Gender"
                  className="w-full"
                  onChange={(e) => setGender(e.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 ">
              <label htmlFor="hobbies">Hobbies</label>
              <MultiSelect
                options={HOBBIES}
                optionLabel="hobby"
                placeholder="Select Hobbies"
                className="w-full"
                value={selectedHobbies}
                onChange={(e) => setSelectedHobbies(e.value)}
              />
            </div>

            <div className="">
              <label htmlFor="education_table">Education</label>
              <DataTable
                value={educationData}
                selectionMode="checkbox"
                editMode="row"
                selection={selectedEducationData}
                onRowEditComplete={onRowEditComplete}
                onSelectionChange={(e) => setSelectedEducationData(e.value)}
                dataKey="education_table"
                tableStyle={{ minWidth: "50rem" }}
              >
                <Column
                  selectionMode="multiple"
                  headerStyle={{ width: "3rem" }}
                ></Column>
                <Column
                  field="institute"
                  header="Name of Institute"
                  style={{ width: "50%" }}
                  editor={(options) => instituteEditor(options)}
                ></Column>
                <Column
                  field="year"
                  header="Year"
                  style={{ width: "20%" }}
                  editor={(options) => yearEditor(options)}
                ></Column>
                <Column
                  field="course"
                  header="Course/Class"
                  style={{ width: "30%" }}
                  editor={(options) => courseEditor(options)}
                ></Column>
                <Column
                  rowEditor
                  headerStyle={{ width: "10%", minWidth: "8rem" }}
                  bodyStyle={{ textAlign: "center" }}
                ></Column>
              </DataTable>
              <Toolbar className="mt-4" start={leftToolbarTemplate}></Toolbar>
            </div>

            <Dialog
              visible={educationDialog}
              style={{ width: "32rem" }}
              contentClassName="flex flex-col gap-3"
              breakpoints={{ "960px": "75vw", "641px": "90vw" }}
              header="Add Education"
              modal
              className="p-fluid"
              // footer={productDialogFooter}
              onHide={hideDialog}
            >
              <div className="field">
                <label htmlFor="institute" className="">
                  Name of Institute
                </label>
                <InputText
                  required
                  className="w-full"
                  value={singleEducationData.institute}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSingleEducationData({
                      ...singleEducationData,
                      institute: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="field">
                <label htmlFor="year" className="">
                  Year
                </label>
                <InputNumber
                  required
                  maxLength={4}
                  useGrouping={false}
                  inputStyle={{ width: "100%" }}
                  value={singleEducationData.year}
                  onValueChange={(e) =>
                    setSingleEducationData({
                      ...singleEducationData,
                      year: e.value,
                    })
                  }
                />
              </div>
              <div className="field">
                <label htmlFor="course" className="">
                  Course/Class
                </label>
                <Dropdown
                  className="w-full"
                  options={COURSES}
                  value={singleEducationData.course}
                  onChange={(e) =>
                    setSingleEducationData({
                      ...singleEducationData,
                      course: e.value,
                    })
                  }
                  placeholder="Select Course"
                />
              </div>
            </Dialog>

            <div className="">
              <Button className="" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Fieldset>
      </div>
    </>
  );
};

export default Page;
