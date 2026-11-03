# eSIMManager Official Website

Official landing page, privacy policy, and user documentation for the eSIMManager iOS application.

## eSIMManager 2.3 website preparation — 2026-11-04

- Approved for publication on 2026-11-04. The App Store version was verified as 2.3. The separate 2.3.1 maintenance work does not require a website update and is not part of this website release.
- All eight homepages now introduce the Duo inner/outer layouts, retained card selection, editing drafts and search filters, and improved manual entry / QR sharing / large-text layouts.
- `assets/v2_3/` contains the original final 2.3 simulator screenshots from the iOS project's `v2.3_release_assets/duo/`. They show Traditional Chinese and fictional demo cards; every locale discloses this. They are not screenshots of 2.3.1.
- `assets/duo-release.css` reuses the existing site palette, preserves screenshot proportions and stacks the layout on phones. Existing feature illustrations and version-labelled manuals remain available; this task does not replace the manuals.
- Download, affiliate, analytics and advertising URLs were compared against HEAD and are unchanged in all eight homepages. App source code and other products' pages were not edited.
- Validation: `node --test tests/esim-duo-release.test.cjs` passes 17/17. Browser checks passed for all eight language selections at 1440px; French, German and Simplified Chinese menu selections at 390px; and Simplified Chinese layout at 320px, without page overflow. Direct `file:` browser testing was unavailable; HTTP navigation was tested. No language-router changes were made.
- The full existing suite has one unrelated, pre-existing failure: `menulens-release.test.cjs` matches `Version 2.0` inside the Gaboon Viper `Version 2.0.6` recommendation on the English MenuLens page. Neither that page nor that test was changed.
- Review images: `../eSIMManager/v2.3_release_assets/website-preview/duo-desktop.png` and `duo-mobile.png`. For a local preview, run `python3 -m http.server 8233 --bind 127.0.0.1` here and open `http://127.0.0.1:8233/?lang=zh-TW`.

- Website: https://getesimmanager.com/
- Privacy Policy: https://getesimmanager.com/privacy.html
- Terms: https://getesimmanager.com/terms.html

It is not tied to any single eSIM brand. You can compare and choose a plan that suits your budget and itinerary, and then use eSIMManager to centrally organize multiple cards, activation information, and expiration dates. Complete the 3 pre-departure confirmations first, and then complete the 2 activation and connection confirmations upon arrival; actual setup, installation, and usage are subject to the official information from iOS and the provider.
If you encounter any problems using the software, please feel free to provide suggestions.

eSIMManager 官方網站

eSIMManager iOS 應用程式的官方首頁、隱私權政策和使用者文件。

- 網址：https://getesimmanager.com/
- 隱私權政策：https://getesimmanager.com/privacy.html
- 條款：https://getesimmanager.com/terms.html
- eSIMManager安卓測試：https://play.google.com/apps/testing/com.mkjohnny.esimmanager
- https://play.google.com/store/apps/details?id=com.mkjohnny.esimmanager
- 人脈大師安卓測試：https://play.google.com/apps/testing/com.mkjohnny.renmaimaster
- https://play.google.com/store/apps/details?id=com.mkjohnny.renmaimaster

不綁定任何單一 eSIM 品牌。你可以自行比較並選擇符合預算與行程的方案，再用 eSIMManager 集中整理多張卡片、啟用資訊與效期。先完成出發前 3 項確認，抵達後再完成 2 項啟用與連線確認；實際設定、安裝與用量仍以 iOS 與供應商官方資訊為準。

軟體使用有任何問題，歡迎提供建議

eSIMManager iOSアプリの公式ランディングページ、プライバシーポリシー、およびユーザーマニュアルです。

- ウェブサイト：https://getesimmanager.com/
- プライバシーポリシー：https://getesimmanager.com/privacy.html
- 利用規約：https://getesimmanager.com/terms.html

特定のeSIMブランドに縛られることなく、ご予算や旅程に合ったプランを比較検討し、eSIMManagerを使って複数のカード、アクティベーション情報、有効期限を一元管理できます。出発前に3つの確認事項を完了し、到着後に2つのアクティベーションおよび接続確認事項を完了してください。実際のセットアップ、インストール、および使用方法については、iOSおよびプロバイダの公式情報をご確認ください。ソフトウェアの使用中に問題が発生した場合は、お気軽にご意見をお寄せください。

Page d'accueil officielle, politique de confidentialité et documentation utilisateur de l'application iOS eSIMManager.

- Site web : https://getesimmanager.com/
- Politique de confidentialité : https://getesimmanager.com/privacy.html
- Conditions d'utilisation : https://getesimmanager.com/terms.html

Cette application est indépendante de toute marque d'eSIM. Comparez les offres et choisissez le forfait qui correspond à votre budget et à votre itinéraire. eSIMManager vous permet ensuite de gérer plusieurs cartes, leurs informations d'activation et leurs dates d'expiration. Veuillez d'abord effectuer les 3 confirmations avant votre départ, puis les 2 confirmations d'activation et de connexion à votre arrivée. L'installation, la configuration et l'utilisation sont soumises aux informations officielles d'iOS et de votre opérateur. N'hésitez pas à nous faire part de vos suggestions en cas de problème avec l'application.


783
eSIMManager iOS 애플리케이션의 공식 랜딩 페이지, 개인정보 보호정책 및 사용자 설명서입니다.

- 웹사이트: https://getesimmanager.com/
- 개인정보 보호정책: https://getesimmanager.com/privacy.html
- 이용약관: https://getesimmanager.com/terms.html

eSIMManager는 특정 eSIM 브랜드에 국한되지 않습니다. 예산과 여행 일정에 맞는 요금제를 비교하고 선택한 후, eSIMManager를 사용하여 여러 eSIM 카드, 활성화 정보 및 만료일을 한 곳에서 관리할 수 있습니다. 출발 전 3단계 확인 절차를 완료하고, 도착 후 2단계 활성화 및 연결 확인 절차를 완료하세요. 실제 설정, 설치 및 사용은 iOS 및 통신사에서 제공하는 공식 정보를 따릅니다. 소프트웨어 사용 중 문제가 발생하면 언제든지 의견을 보내주세요.

Offizielle Landingpage, Datenschutzerklärung und Benutzerdokumentation für die eSIMManager iOS-App.

- Website: https://getesimmanager.com/
- Datenschutzerklärung: https://getesimmanager.com/privacy.html
- Nutzungsbedingungen: https://getesimmanager.com/terms.html

Die App ist an keinen bestimmten eSIM-Anbieter gebunden. Sie können Tarife vergleichen und den passenden für Ihr Budget und Ihre Reise auswählen. Mit eSIMManager verwalten Sie anschließend mehrere eSIM-Karten, Aktivierungsinformationen und Ablaufdaten zentral. Schließen Sie zunächst die drei Bestätigungen vor Reiseantritt ab und bestätigen Sie anschließend die Aktivierung und Verbindung nach Ihrer Ankunft. Einrichtung, Installation und Nutzung richten sich nach den offiziellen Informationen von iOS und Ihrem Anbieter. Bei Problemen mit der Software freuen wir uns über Ihre Anregungen.

Pagina ufficiale, informativa sulla privacy e documentazione utente per l'applicazione iOS eSIMManager.

- Sito web: https://getesimmanager.com/
- Informativa sulla privacy: https://getesimmanager.com/privacy.html
- Termini e condizioni: https://getesimmanager.com/terms.html

L'applicazione non è vincolata a un singolo operatore eSIM. Puoi confrontare e scegliere un piano tariffario adatto al tuo budget e al tuo itinerario, e utilizzare eSIMManager per gestire centralmente più schede, informazioni di attivazione e date di scadenza. Completa prima le 3 conferme pre-partenza e poi le 2 conferme di attivazione e connessione all'arrivo; la configurazione, l'installazione e l'utilizzo effettivi sono soggetti alle informazioni ufficiali di iOS e del fornitore. In caso di problemi con il software, non esitare a fornire suggerimenti.
