# 家庭記帳本 Expense Tracker

<div id="top"></div>
<p>
  <a href="https://github.com/Prysline/expense-tracker" target="_blank">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  </a>
  <a href="https://github.com/Prysline/expense-tracker/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/Prysline/expense-tracker.svg" />
  </a>
</p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>目錄 Table of Contents</summary>
  <ol>
    <li>
      <a href="#關於-about">關於 About</a>
      <ul>
        <li><a href="#特色-Feature">特色 Feature</a></li>
        <li><a href="#截圖-Screenshot">截圖 Screenshot</a></li>
        <li><a href="#建置環境-built-with">建置環境 Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#入門-getting-started">入門 Getting Started</a>
      <ul>
        <li><a href="#前置-prerequisites">前置 Prerequisites</a></li>
        <li><a href="#安裝-installation">安裝 Installation</a></li>
      </ul>
    </li>
    <li><a href="#版權聲明-license">版權聲明 License</a></li>
    <li><a href="#致謝-acknowledgments">致謝 Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## 關於 About

一個以 Node.js 和 Express 製作的記帳網站，擁有分類功能，並顯示合計支出於首頁。
註冊不同帳號登入後可儲存不同的支出資料。

### 特色 Feature
#### 登入
- 使用者註冊
- FACEBOOK登入
#### 資料庫
- 於首頁可檢視不同分類
- 新增支出條目
- 修改支出條目
- 刪除支出條目
#### 使用者體驗
- 首頁顯示所選分類總支出
- 登入登出、新增修改刪除等回饋通知
- 進入編輯頁面自動輸入今日日期
- 刪除支出條目時會跳出提醒視窗


### 截圖 Screenshot
<div>
  <img alt="index" src="https://github.com/Prysline/expense-tracker/blob/main/public/images/index.png" style="display: inline-box; width: 12em;">
  <img alt="login" src="https://github.com/Prysline/expense-tracker/blob/main/public/images/login.png" style="display: inline-box; width: 12em;">
  <img alt="register" src="https://github.com/Prysline/expense-tracker/blob/main/public/images/register.png" style="display: inline-box; width: 12em;">
</div>
<div>
  <img alt="new" src="https://github.com/Prysline/expense-tracker/blob/main/public/images/new.png" style="display: inline-box; width: 12em;">
  <img alt="edit" src="https://github.com/Prysline/expense-tracker/blob/main/public/images/edit.png" style="display: inline-box; width: 12em;">
</div>

<p align="right">(<a href="#top">back to top</a>)</p>

### 建置環境 Built With

- [Node.js](https://nodejs.org/) (v14.18.1)
- [Express](https://expressjs.com/)
- [Express-handlebars](https://github.com/express-handlebars/express-handlebars)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [mongoDB](https://www.mongodb.com/) (v4.2.17)
- [mongoose](https://mongoosejs.com/)
- [Robo 3T](https://robomongo.org/)
- [Facebook developer app](https://developers.facebook.com/apps)
- .env（環境變數設定檔案）

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## 入門 Getting Started

### 前置 Prerequisites

如果要使用 `npm run dev` 的指令，需先安裝 [nodemon](https://www.npmjs.com/package/nodemon)。
* nodemon
  ```sh
  npm install -g nodemon
  ```

所有新增、編輯、移除等關於資料庫的功能，均建立在使用 [mongoDB](https://www.mongodb.com/) + [mongoose](https://mongoosejs.com/) 的環境下。

### 安裝 Installation

1. 在要安裝的位置開啟終端機(terminal) clone 專案檔案
   ```sh
   git clone https://github.com/Prysline/expense-tracker.git
   ```
2. 進入專案資料夾
   ```sh
   cd expense-tracker
   ```
3. 安裝所需套件
   ```sh
   npm install
   ```
4. 於 `/expense-tracker` 建立 `.env` 檔案，可複製 `.env.example` 加以修改，或是參考以下內容設定：
   ```
    FACEBOOK_ID=FACEBOOK應用程式編號
    FACEBOOK_SECRET=FACEBOOK應用程式密鑰
    FACEBOOK_CALLBACK=<http://localhost:3000/auth/facebook/callback>
    SESSION_SECRET=可自訂任意文字
    MONGODB_URI=mongodb://localhost/expense-tracker
    PORT=3000
   ```
4. 建立種子資料 （須連線 mongoDB 伺服器）
   ```sh
   npm run seed
   ```
5. 使用 Node.js 執行 Express 伺服器（更新檔案時需要另外 ctrl+C 退出 Node.js 環境並重新啟動）
   ```sh
   npm run start
   ```
   或是使用 nodemon 執行 Express 伺服器（會在檔案變更時自動重啟伺服器，需安裝 nodemon）
   ```sh
   npm run dev
   ```
6. 在瀏覽器網址列輸入 `http://localhost:3000/` 瀏覽網站
7. 使用測試帳號登入
   ```
   #user1
   name : 廣志
   email : user1@example.com
   password : 12345678
   ```
   ```
   #user2
   name : 小新
   email : user2@example.com
   password : 12345678
   ```
#### 使用第三方登入
1. 建立 [Facebook developer app](https://developers.facebook.com/apps)，新增 FACEBOOK登入
2. 於 設定>基本資料 中，找到應用程式編號與密鑰，並將內容加入`.env`檔案中
  ```
   FACEBOOK_ID = FACEBOOK應用程式編號
   FACEBOOK_SECRET = FACEBOOK應用程式密鑰
   FACEBOOK_CALLBACK = http://localhost:3000/auth/facebook/callback
  ```


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## 版權聲明 License

使用 [MIT](https://github.com/Prysline/expense-tracker/blob/main/LICENSE) License。

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## 致謝 Acknowledgments

* [ALPHAcamp](https://tw.alphacamp.co/)
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [shields IO](https://shields.io/)

<p align="right">(<a href="#top">back to top</a>)</p>


