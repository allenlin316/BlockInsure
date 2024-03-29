# BlockInsure (保鏈安全)

* 利用區塊鏈技術實現智能合約，實現自動投保以及理賠流程。透過不可變的區塊鏈數據，提高透明度和數據安全性，簡化保險業務，加速賠償流程。
* 此系統是建置在測試網上(Sepolia Testnet)，很安全也不用真錢就可以體驗
    * Contract Address: `0x51A44c8158C3501dA8f3f56aA86923f0C04aAA42`
    * 可以將本 repo 下載下來進 vscode 開啟 live server 並連接自己的 MetaMask 即可以使用
    * 也可以進入[網站中](https://allenlin316.github.io/BlockInsure/)再連結自己的 MetaMask 插件即可以使用

## 智能合約各項函式介紹
* policyCounter: 目前有幾個保險單
* policies: 輸入想看的ID，查看保險單的各項屬性
    * policyId(保險單ID)
    * carOwner(購買保險的使用者 address)
    * premiumAmount
    * coverageAmount
    * purchaseTimestamp(建立保單的時間蹉記)
    * expirationTimestamp(保單時效)
    * isClaimed(出險狀態)
    * isPremiumPaid(保險費付費狀態)
* owner: 購買保險的使用者 address
* purchaseInsurance(建立保單) 
    * premiumAmount(保險費，投保要付的金額)
    * coverageAmount(保險金額，也就是理賠金額)
    * durationInMonths(保險時間)
* processPremiumAmount(付款投保)
    * 這邊為使用者購買保險的步驟(所以要付費給合約，注意這邊要 match 剛剛設定的保險費)
    * policyId(保險單ID)
* fileClaim(出險)
    * policyId(想要出險的保險單ID)
    * claimAmount(想要拿的金額，但這邊不得高於合約內的現有金額)
