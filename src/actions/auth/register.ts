"use server"
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export const registerUser = async (
  email: string,
  password: string
) => {
  try {
    console.log('registerUser', email, password);
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });
    return {
      ok: true,
      user: user,
      message: 'Usuario creado con éxito'
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Algo salió mal'
    };
  }
  
}
