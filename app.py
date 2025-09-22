from dotenv import load_dotenv
import os
from portfolio import create_app

# Load .env variables
load_dotenv()

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
