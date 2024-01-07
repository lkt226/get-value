import css from './style.module.scss'

import { Save } from 'lucide-react'

import { FormEvent, useEffect, useState } from 'react'

import Card from "@/components/Card"
import Input from '@/components/Input'
import Button from '@/components/Button/Default'
import Avatar from '@/components/Avatar'
import ScrollArea from '@/components/ScrollArea'
import ItemNew from '@/components/Item/New'
import FormService from '@/components/Form/Service'
import ItemService from '@/components/Item/Service'
import Select from '@/components/Select/Default'

import { useUser } from '@/store/User'
import { useCurrentProfile } from '@/store/currentProfile'
import { useSegment } from '@/store/segments'

import { ProfileType } from '@/assets/data/type'
import { useTaxRegime } from '@/store/taxRegime'
import { useMenu } from '@/store/Menu'


const Profile = () => {
  const user = useUser(({ services }) => ({ services }))
  const currentProfile = useCurrentProfile(store => store)
  const segments = useSegment(store => store.segments)
  const taxRegimes = useTaxRegime(store => store.taxRegimes)
  const currentPage = useMenu(store => store.currentPage)

  const [email, setEmail] = useState(currentProfile.email)
  const [company, setCompany] = useState(currentProfile.name)
  const [segment, setSegment] = useState(currentProfile.segment)
  const [taxRegime, setTaxRegime] = useState(currentProfile.tax_regime)
  const [administrativeExpenses, setAdministrativeExpenses] = useState(currentProfile.fiscal.administrative_expenses)
  const [payment, setPayment] = useState(currentProfile.fiscal.worker.salary)
  const [weeklyHours, setweeklyHours] = useState(currentProfile.fiscal.weekly_hours)

  const selectTheFollow = (value:string) => setSegment(value)
  const selectTheTaxRegime = (value:string) => setTaxRegime(value)

  const reset = () => {
    setEmail(currentProfile.email)
    setCompany(currentProfile.name)
    setSegment(currentProfile.segment)
    setTaxRegime(currentProfile.tax_regime)
    setAdministrativeExpenses(currentProfile.fiscal.administrative_expenses)
    setPayment(currentProfile.fiscal.worker.salary)
    setweeklyHours(currentProfile.fiscal.weekly_hours)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    
    const profile: ProfileType = {
      email,
      name: company,
      segment,
      tax_regime: taxRegime,
      fiscal: {
        administrative_expenses: administrativeExpenses,
        weekly_hours: weeklyHours,
        worker: {
          salary: payment,
          weekly_hours: weeklyHours
        } 
      },
    }

    currentProfile.saveProfile(profile)
    reset()
  }

  return (
    <Card className="h-full" orientation="vertical">
      <h2>Perfil</h2>

      <form onSubmit={handleSubmit} className={css["data"]}>

        <div className={css["inputs"]}>
          <div className={css["avatar_and_email"]}>
            <Avatar  />
            <Input 
              name="email" 
              label="E-mail" 
              disabled
              value={email}
              onInput={(value) => setEmail(value)} 
            />
          </div>
          <div className={css["name_and_follow"]}>
            <Input 
              name="name" 
              label="Nome" 
              required
              value={company}
              onInput={(value) => setCompany(value)} 
            />
            <Select 
              label='Serviço' 
              name='service' 
              options={segments} 
              defaultValue={segment || (segments.length ? segments[0].value : '')} 
              onValueChange={selectTheFollow} 
            />
          </div>
        </div>

        <div className={css["finance"]}>
          <h3>Financeiro</h3>
          <Input 
            name="administrative_expenses" 
            label="Despesas administrativas" 
            className={css['administrative_expenses']}
            required
            isMoney
            value={administrativeExpenses}
            onInput={(value) => setAdministrativeExpenses(value)}
          />
          <Select 
            label='Regime tributário' 
            name='tax_regime' 
            options={taxRegimes} 
            defaultValue={taxRegime || (taxRegimes.length > 0 ? taxRegimes[0].value : '')} 
            onValueChange={selectTheTaxRegime} 
          />
          <Input 
            name="payment" 
            label="Pró-labore" 
            required
            isMoney
            value={payment}
            onInput={(value) => setPayment(value)}
          />
          <Input 
            name="weekly_hours" 
            label="Horas semanais" 
            required
            type='number'
            value={`${weeklyHours}`}
            onInput={(value) => setweeklyHours(parseFloat(value))}
          />
        </div>

        <div className={css["services"]}>
          <h3>Serviço</h3>
          <ScrollArea className={css["content"]}>
            <ItemNew title='Novo Serviço'>
              <FormService />
            </ItemNew>
            {
              user.services &&
              user.services.reverse().map((service) => (
                <ItemService key={service.id} item={service} />
              ))
            }
          </ScrollArea>
        </div>

        <Button icon={Save} type="submit" variant="secondary">
          Salvar perfil
        </Button>
      </form>
    </Card>
  )
}

export default Profile