import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForma from "./forms/SummaryForm";
import SummaryForm from "./forms/SummaryForm";
import PrintForm from "./forms/PrintForm";

export const steps:{
    title: string;
    component: React.ComponentType<EditorFormProps>;
    key: string;

}[]=[
    {
        title: "General Info",
        component: GeneralInfoForm,
        key: "general-info",
    },
    {
        title: "Personal Info",
        component: PersonalInfoForm,
        key: "personal-info",
    },
    {
        title: "Work Experience Info",
        component: WorkExperienceForm,
        key: "workexperience-info",
    },
    {
        title: "Education Info",
        component: EducationForm,
        key: "education-info",
    },
    {
        title: "Skills",
        component: SkillsForm,
        key: "skill",
    },
    {
        title: "Summary",
        component: SummaryForm,
        key: "summary-info",
    },
    {
        title: "Preview & Print",
        component: PrintForm,
        key: "preview-print",
    },
];