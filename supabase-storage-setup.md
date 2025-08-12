# Configuración de Supabase Storage para Imágenes

## Configuración del Bucket

Para que la funcionalidad de carga de imágenes funcione correctamente, necesitas configurar un bucket en Supabase Storage.

### 1. Crear el Bucket en Supabase Dashboard

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.io)
2. Navega a **Storage** en el menú lateral
3. Haz clic en **Create bucket**
4. Configuración del bucket:
   - **Name**: `images`
   - **Public bucket**: ✅ Habilitado (para URLs públicas)
   - **File size limit**: 50 MB (opcional)
   - **Allowed MIME types**: `image/*` (opcional, para solo imágenes)

### 2. Configurar Políticas RLS (Row Level Security)

Como estás usando NextAuth (no Supabase Auth), necesitas crear políticas públicas para el storage. Las restricciones de seguridad se manejan en los actions del servidor.

#### Política para Select (Ver imágenes) - Público
```sql
CREATE POLICY "Imágenes públicas para lectura" ON storage.objects
FOR SELECT USING (bucket_id = 'images');
```

#### Política para Insert (Subir imágenes) - Público
```sql
CREATE POLICY "Permitir subir imágenes al bucket images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images');
```

#### Política para Update (Actualizar imágenes) - Público
```sql
CREATE POLICY "Permitir actualizar imágenes en bucket images" ON storage.objects
FOR UPDATE USING (bucket_id = 'images');
```

#### Política para Delete (Eliminar imágenes) - Público
```sql
CREATE POLICY "Permitir eliminar imágenes del bucket images" ON storage.objects
FOR DELETE USING (bucket_id = 'images');
```

**Nota:** Estas políticas son públicas porque usas NextAuth. La seguridad se implementa en los server actions verificando la sesión del usuario.

### 3. Estructura de Carpetas Recomendada

El sistema creará automáticamente esta estructura:

```
images/
├── profiles/
│   ├── 1704067200000_abc123.jpg
│   └── 1704067201000_def456.png
└── projects/
    ├── 1704067202000_ghi789.jpg
    └── 1704067203000_jkl012.png
```

### 4. Variables de Entorno

Asegúrate de tener estas variables en tu archivo `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Funcionalidades Implementadas

### ✅ Actions de Storage

- **upload-image.ts**: Subir imágenes generales, perfil y proyectos
- **delete-image.ts**: Eliminar imágenes del storage y base de datos
- **get-image.ts**: Obtener URLs públicas y firmadas
- **update-image.ts**: Actualizar/reemplazar imágenes existentes

### ✅ Componentes UI

- **ImageUpload**: Componente reutilizable para carga de imágenes con drag & drop
- **ProfileImageUpload**: Componente específico para imagen de perfil

### ✅ Integración en Profile Page

- Carga y visualización de imagen de perfil
- Eliminación de imagen existente
- Actualización automática del portfolio

## Uso de los Actions

### Subir Imagen de Perfil
```typescript
import { uploadProfileImage } from '@/actions/storage';

const result = await uploadProfileImage(file, userId);
if (result.success) {
  console.log('Image URL:', result.url);
}
```

### Subir Imagen de Proyecto
```typescript
import { uploadProjectImage } from '@/actions/storage';

const result = await uploadProjectImage(file, projectId, 'Caption opcional');
if (result.success) {
  console.log('Image URL:', result.url);
}
```

### Eliminar Imagen
```typescript
import { deleteProfileImage, deleteProjectImage } from '@/actions/storage';

// Eliminar imagen de perfil
await deleteProfileImage(userId);

// Eliminar imagen de proyecto
await deleteProjectImage(imageId);
```

## Próximos Pasos

1. **Configurar el bucket** en Supabase Dashboard siguiendo los pasos arriba
2. **Establecer las políticas RLS** para seguridad
3. **Probar la funcionalidad** subiendo una imagen de perfil
4. **Implementar imagen upload para proyectos** si es necesario

## Notas de Seguridad

- **Storage público**: Las políticas del bucket son públicas, pero la seguridad se maneja en los server actions
- **Autenticación**: Todos los actions verifican la sesión NextAuth antes de proceder
- **Autorización**: Los usuarios solo pueden modificar sus propias imágenes/proyectos
- **Base de datos**: Se usa Prisma con tu base de datos principal (no la de Supabase)
- **Limpieza automática**: Al actualizar una imagen, la anterior se elimina del storage
- **Validaciones**: Tamaño máximo (5MB), tipos de archivo (solo imágenes)
- **Nombres únicos**: Timestamp + ID aleatorio para evitar colisiones
