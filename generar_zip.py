import zipfile
import os
from datetime import datetime

# Configuración
nombre_zip = f"rf-portfolio_{datetime.now().strftime('%Y%m%d_%H%M%S')}.zip"
excluir_ext = {".zip", ".rar", ".bat", ".gif", ".code-workspace"}
directorio_base = "."  # Cambia esto al directorio que deseas comprimir

with zipfile.ZipFile(nombre_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(directorio_base):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in excluir_ext:
                continue
            ruta_completa = os.path.join(root, file)
            ruta_relativa = os.path.relpath(ruta_completa, directorio_base)
            zipf.write(ruta_completa, ruta_relativa)

print(f"📦 Backup creado: {nombre_zip}")