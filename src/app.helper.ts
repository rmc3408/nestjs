import session from "express-session";

export async function setupApp(app: any) {
  app.use(session({
    secret: 'a',
    resave: false,
    saveUninitialized: false
  }))
} 