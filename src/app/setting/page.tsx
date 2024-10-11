import React from 'react'
import SettingPrivacy from './components/SettingPrivacy'
import { createClient } from '@/utils/supabase/server';

const page = async () => {
  const supabase = createClient();
  const data = await supabase.from("setting").select();

  console.log('data', data);
  console.log('"asdfasdfasdf"', "asdfasdfasdf");
  return (
    <div>
      <SettingPrivacy data={data}></SettingPrivacy>
    </div>
  )
}

export default page