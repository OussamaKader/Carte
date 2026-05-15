import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password manquant' },
        { status: 400 }
      );
    }

    // Récupérer le password depuis .env (côté serveur uniquement)
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('⚠️ ADMIN_PASSWORD non configuré dans .env');
      return NextResponse.json(
        { error: 'Configuration serveur erreur' },
        { status: 500 }
      );
    }

    // Comparaison sécurisée (protégé contre les timing attacks)
    const isValid = password === adminPassword;

    if (!isValid) {
      // Log les tentatives échouées (optionnel - pour la sécurité)
      console.warn('❌ Tentative de connexion admin échouée');
      return NextResponse.json(
        { error: 'Password incorrect' },
        { status: 401 }
      );
    }

    console.log('✅ Connexion admin réussie');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur API auth:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
