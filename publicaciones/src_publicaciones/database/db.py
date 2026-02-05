from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app_conf import DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME

# Formato: mysql+pymysql://usuario:contraseña@host:puerto/nombre_db
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,  
    pool_recycle=3600,   
    echo=True            # Muestra las queries SQL 
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


