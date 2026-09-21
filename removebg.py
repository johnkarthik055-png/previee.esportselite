from rembg import remove
from PIL import Image
import io

with open('public/hero-art.png', 'rb') as f:
    input_data = f.read()

output_data = remove(input_data)

with open('public/hero-art.png', 'wb') as f:
    f.write(output_data)

print('Background removed. hero-art.png updated with transparency.')
