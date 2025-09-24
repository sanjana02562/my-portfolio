from dotenv import load_dotenv
import os
from portfolio import create_app

# Load .env from your project root
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

# Debug
print("DEBUG EMAIL_USER =", os.getenv("EMAIL_USER"))

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
