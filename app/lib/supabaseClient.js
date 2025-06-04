import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // o ANON_KEY según tus necesidades
);

// Insertar ejemplo
const { data, error } = await supabase.from('usuarios').insert([
  { nombre: 'Juan', correo: 'juan@email.com' }
]);
