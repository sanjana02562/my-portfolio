from dotenv import load_dotenv
import os
from portfolio import create_app

# Load .env variables
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv()

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
