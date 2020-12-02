name: 金融养

on:
  workflow_dispatch:
  schedule:
    - cron: '12 * * * *'
  # watch:
  #   types: started
  # repository_dispatch:
  #   types: speed
jobs:
  build:

    runs-on: ubuntu-latest
    if: github.event.repository.owner.id == github.event.sender.id
    env:
      URL: "https://raw.githubusercontent.com/lxk0301/jd_scripts/master/jd_pigPet.js"
      RUNFILE: "jd_speed.js"
      JD_COOKIE: ${{ secrets.JD_COOKIE }}
      JD_DEBUG: ${{ secrets.JD_DEBUG }}
      PUSH_KEY: ${{ secrets.PUSH_KEY }}
      BARK_PUSH: ${{ secrets.BARK_PUSH }}
      BARK_SOUND: ${{ secrets.BARK_SOUND }}
      TG_BOT_TOKEN: ${{ secrets.TG_BOT_TOKEN }}
      TG_USER_ID: ${{ secrets.TG_USER_ID }}
      DD_BOT_TOKEN: ${{ secrets.DD_BOT_TOKEN }}
      DD_BOT_SECRET: ${{ secrets.DD_BOT_SECRET }}
      IGOT_PUSH_KEY: ${{ secrets.IGOT_PUSH_KEY }}
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        #with:
        #  repository: lxk0301/scripts
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - name: Cache node_modules
        uses: actions/cache@v2 # 使用 GitHub 官方的缓存 Action。
        env:
          cache-name: cache-node-modules
        with:
          path: node_modules
          key: ${{ runner.os }}-${{ env.cache-name }}-${{ hashFiles('package-lock.json') }} # 使用 package-lock.json 的 Hash 作为缓存的 key。也可以使用 package.json 代替
      - name: npm install
        if: env.JD_COOKIE
        run: |
          npm install
      - name: '运行 【金融养猪】'
        if: env.JD_COOKIE
        run: |
          node actions.js
