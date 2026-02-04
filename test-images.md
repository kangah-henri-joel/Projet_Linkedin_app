# Test d'accès aux images
# Toutes ces URLs devraient être accessibles via http://localhost:4200/assets/images/nom_fichier

## Images du profil principal
- http://localhost:4200/assets/images/KangahHenriJoel.jpg
- http://localhost:4200/assets/images/MonProfil.jpeg

## Images des publications
- http://localhost:4200/assets/images/Mespublication.jpg
- http://localhost:4200/assets/images/mespubication1.jpg
- http://localhost:4200/assets/images/mespublication2.jpg
- http://localhost:4200/assets/images/Mapubli1.jpg
- http://localhost:4200/assets/images/monPubli5.jpg

## Images des amis/collègues
- http://localhost:4200/assets/images/amie.jpg
- http://localhost:4200/assets/images/ami2.png
- http://localhost:4200/assets/images/ami3.jpg
- http://localhost:4200/assets/images/ami4.jpg
- http://localhost:4200/assets/images/ami5.jpg
- http://localhost:4200/assets/images/ami6.jpg
- http://localhost:4200/assets/images/amis1.jpg

## Images des publications d'amis
- http://localhost:4200/assets/images/PubliAmi2.jpg
- http://localhost:4200/assets/images/PubliAmie5.jpg
- http://localhost:4200/assets/images/publAmi1.jpg
- http://localhost:4200/assets/images/publAmi2.jpg
- http://localhost:4200/assets/images/publAmi3.jpg
- http://localhost:4200/assets/images/publAmi4.jpg
- http://localhost:4200/assets/images/publAmie.jpg
- http://localhost:4200/assets/images/publAmie_5.jpg
- http://localhost:4200/assets/images/publ.jpg

## Screenshots
- http://localhost:4200/assets/images/Screenshot_20250923_021925_WhatsApp.jpg
- http://localhost:4200/assets/images/Screenshot_20251003_150128_WhatsApp.jpg
- http://localhost:4200/assets/images/Screenshot_20260105_194001_Jumia.jpg

## Bonnes pratiques Angular vérifiées :
✅ Tous les chemins commencent par "assets/" (jamais "src/assets/")
✅ Images statiques : src="assets/images/..."
✅ Images dynamiques : [src]="variable" avec variable définie en TypeScript
✅ Icônes Bootstrap : <i class="bi bi-nom-icone"></i>
✅ Fallback d'erreur : onerror="this.src='assets/images/...'"
