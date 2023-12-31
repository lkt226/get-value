'use client';

import css from './style.module.scss'
import { LogOut } from 'lucide-react';

import ItemAside from '@/components/Item/Aside';
import Card from '@/components/Card'

import Logo from '@/components/Icon/Logo';
import Avatar from '@/components/Avatar';

import { logout } from '@/services/firebase';

const Aside = () => {

  return (
    <aside className={css["outside"]}>
      <div className={css["inside"]}>
        <Card className='w-full h-full'>
          <menu type="toolbar">
            <ul>
              <ItemAside label='GET-VALUE' page='calculadora' icon={Logo} />
              <ItemAside label='Perfil' page='perfil' icon={Avatar} />

              <li className={css["logout"]}>
                <button onClick={logout}>
                  <span className={css["icon"]}><LogOut /></span>
                  <span className={css["label"]}>Sair</span>
                </button>
              </li>
            </ul>
          </menu>
        </Card>
      </div>
    </aside>
  );
}

export default Aside;