'use client';

import css from './style.module.scss'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Calculator, User, History, LogOut } from 'lucide-react';

import { AsideItem } from './Item';
import Logo from '@/components/Icon/Logo';


import { pagePath } from '@/assets/data/sitemap'

const Aside = () => {
  const pathname = usePathname()
  const [active, setActive] = useState(false)

  const toggleAside = () => setActive(!active)

  useEffect(() => {
    setActive(false)
  }, [pathname])

  return (
    <aside className={css["root"]} data-active={active}>
      <div className={css["trigger"]} onClick={toggleAside}>
        <div />
        <div />
        <div />
      </div>

      <div className={css["content"]}>
        <Logo type='alt' className={css["logo"]} />

        <menu>
          <ul>
            <AsideItem hasChevron icon={Calculator} title="Calculadora" href={pagePath.calculadora} />
            <AsideItem hasChevron icon={User} title="Perfil" href={pagePath.perfil} />
            <AsideItem hasChevron icon={History} title="Histórico" href={pagePath.historico} />
          </ul>

          <span className={css['logout']}>
            <AsideItem icon={LogOut} title="Sair" href={pagePath.sair} />
          </span>
        </menu>
      </div>
    </aside>
  );
}

export default Aside;