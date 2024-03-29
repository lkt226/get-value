import { UserType } from "./type";

type GenerateUserType = (uid:string) => UserType

export const defaultWeeklyHours = [
  { name: "seg", label: "Seg", value: "8" },
  { name: "ter", label: "Ter", value: "8" },
  { name: "qua", label: "Qua", value: "8" },
  { name: "qui", label: "Qui", value: "8" },
  { name: "sex", label: "Sex", value: "8" },
  { name: "sab", label: "Sab", value: "0" },
  { name: "dom", label: "Dom", value: "0" },
]

const generateUser:GenerateUserType  = (uid) => ({
  id: uid,
  profile: {
    company: {
      name: '',
      tax_regime: '',
      segment: '',
      email: '',
    },
    fiscal: {
      administrative_expenses: '0',
      weekly_hours: defaultWeeklyHours,
    },
  },
  workers: [],
  projects: [],
  services: [],
})

export default generateUser