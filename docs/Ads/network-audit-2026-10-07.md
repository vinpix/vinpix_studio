# Kitchen Together 2 app-ads.txt audit — 2026-10-07

## Result

- All five bidding networks shown in LevelPlay have a syntactically valid
  publisher declaration in the live file.
- All five publisher IDs now have corroborating evidence. Liftoff's Account
  Overview confirms the exact ID already declared in the live file, despite
  its absence from the public seller registry.
- Liftoff's current official recommended list initially had 38 reseller
  declarations absent from the live file. The user approved their publication;
  all 38 are now deployed and verified at the public endpoints.
- This is a declaration audit, not confirmation that every network's crawler
  has accepted the file or that every current reseller recommendation is present.
- Publication added the approved 38 rows; existing declarations were retained.

| Network | DIRECT seller ID in live file | Evidence | Result |
| --- | --- | --- | --- |
| Google AdMob | `pub-8456418931078206` | Google sellers.json names Lê Quốc Kiệt; both AdMob application IDs in `Assets/LevelPlay/Resources/LevelPlayMediatedNetworkSettings.asset` use this publisher prefix. Signed-in AdMob confirms both store apps' app-ads.txt found and verified. | Publisher ID and Android/iOS crawler status verified. |
| Pangle | `5040994` | `pangleglobal.com/sellers.json` identifies VINPIX COMPANY LIMITED, PUBLISHER, `vinpixstudio.com`. | Identity and domain match. |
| Unity Ads | `2394196` | `unity.com/sellers.json` identifies kiet57441, PUBLISHER, `vinpixstudio.com`. | Identity and domain match. |
| ironSource | `400826` | `ironsrc.com/sellers.json` identifies Vinpix, PUBLISHER, `vinpixstudio.com`. | Identity and domain match. |
| Liftoff Monetize | `6919a76e183f5b55a88583f2` | Signed-in Vinpix account's Overview displays this exact Account ID. Not found among 2,401 public `vungle.com/sellers.json` entries, last modified 2026-10-06 17:27:29 UTC. | Account ID corroborated; all current recommended reseller declarations present after deployment. Public seller registry identity remains unresolved. |

## Dashboard follow-up and proposed Liftoff update

- Liftoff sign-in completed with the user-provided email verification code.
  No credential values or codes are recorded in documentation.
- Account: Vinpix. Account Overview's disabled Account ID field displays
  `6919a76e183f5b55a88583f2`.
- The signed-in application list includes Kitchen Together (Android) and
  Kitchen Together 2 (iOS), both Active and reporting revenue for the last seven
  days. Application IDs are distinct from the publisher Account ID.
- Downloaded the official list from `https://publisher.vungle.com/vungleAdsTxt`.
  The page displays Last Updated: Sep 21, 2026 6:42 PM; download is 16,567 bytes.
- After normalizing domain case and whitespace and comparing the first three
  fields, 38 recommended reseller declarations are absent. These do not create
  new DIRECT/RESELLER conflicts with existing rows.
- Another 23 existing rows lack the recommended fourth certification field.
  This field is optional; these are not counted as missing seller declarations.
- Prepared `/Users/kietle/Desktop/Kiet/yandex-kt2-20261007/app-ads.liftoff-proposed.txt`
  by retaining current contents and appending the 38 missing entries. After the
  user's explicit approval, copied it to `public/app-ads.txt` and the built
  `.open-next/assets/app-ads.txt`, then deployed the existing built Worker.
- AdMob opened under the browser's default `kietle@vinpixstudio.com` account,
  which shows signup rather than the game's dashboard. Selected the existing
  `vinpix7@gmail.com` account; Google requires a password that is not present in
  the observed saved-password choices. The user opened the signed-in Vinpix
  Brave profile; no new AdMob account was created.
- AdMob app-ads.txt page displays `app-ads.txt file found and verified` for
  Android `com.kitchentogether` and iOS store ID `6748915442`, both Ready. Last
  crawled: 2 hours ago at inspection. Expanded Android row explicitly confirms
  the publisher ID was found. Account-wide app-ads.txt queries: 100% authorized.
- Saved dashboard evidence:
  `/Users/kietle/Desktop/Kiet/yandex-kt2-20261007/admob-appads-verified-android-ios.png`.
  This cached crawl predates the new Liftoff rows, so it does not assert those
  additions have already been crawled by Google.

## Approved publication

- Current Worker version: `587f6631-ccd2-47dc-a144-76058142eec5`.
- Wrangler uploaded exactly one changed static asset: `/app-ads.txt`.
- Current file: 111,453 bytes, 2,554 seller rows, SHA-256
  `727913f7c7a6b0679ce2c1738422015818638755500d3bc05eb8ad3edbdadaf0`.
- Apex, `www` and workers.dev endpoints return HTTP 200, `text/plain`, and
  exactly the current source bytes. Comparing against Liftoff's downloaded
  recommendation leaves zero missing reseller declarations.
- See [deployment record](../Deployment/liftoff-appads-2026-10-07.md).

## Hosting and discovery — initial audit before Liftoff update

- Apex and `www` GET requests: HTTP 200, `Content-Type: text/plain`, 109,910
  bytes, matching the public source's SHA-256
  `2ae3b39eeafb4c6df74bbd0cf6ee101acb83ea600b2df3367f0a8af6c5d1e386`.
- `ownerdomain=vinpixstudio.com` is present.
- Android Google Play listing's Website link points to `vinpixstudio.com`.
- 2,516 seller rows, no exact normalized duplicate rows, no UTF-8 BOM, and no
  invalid column counts or relationship values found by the parser.
- Google-adstxt, Googlebot and Mediapartners-Google user-agent requests returned
  HTTP 200 from this test location. This does not establish actual crawler
  acceptance. Python-urllib user-agent requests returned HTTP 403.
- `/robots.txt` returned HTTP 404 on both hosts, so no robots.txt Disallow rule
  was observed. Google crawler statuses were subsequently verified above;
  other networks' crawler acceptance was not inspected.
- LevelPlay's Android Rewarded report for Yesterday shows impressions and
  revenue for all five networks. This confirms observed delivery, not complete
  app-ads.txt authorization for every buyer.

## Reseller review

Nine domain/ID pairs have both DIRECT and RESELLER declarations. These pairs
already occur in the official Yandex export downloaded from this account;
they were not introduced by the merge logic assigning a new relationship.
Do not arbitrarily remove or relabel entries without the relevant network's
authoritative recommendation.

| Advertising system | Seller ID |
| --- | --- |
| rubiconproject.com | 24400 |
| spinx.biz | 1373698882 |
| connatix.com | 1987050886044473 |
| 33across.com | 0015a00003DKg9ZAAT |
| betweendigital.com | 44229 |
| mangomob.net | 5000671969 |
| themediagrid.com | FWN84J |
| start.io | 150505487 |
| vidazoo.com | 682c2398788ffecb2b2afc37 |

## References

- [Live declarations](https://vinpixstudio.com/app-ads.txt)
- [Google Play listing](https://play.google.com/store/apps/details?id=com.kitchentogether)
- [Google seller registry](https://storage.googleapis.com/adx-rtb-dictionaries/sellers.json)
- [Pangle seller registry](https://pangleglobal.com/sellers.json)
- [Unity seller registry](https://unity.com/sellers.json)
- [ironSource seller registry](https://ironsrc.com/sellers.json)
- [Liftoff seller registry](https://vungle.com/sellers.json)
- [Liftoff account ID and recommended export instructions](https://support.vungle.com/hc/en-us/articles/360055891252-app-ads-txt)
- [Unity configuration and recurring list updates](https://docs.unity.com/en-us/monetization/dashboard/app-ads-txt/set-up-app-ads-txt)
