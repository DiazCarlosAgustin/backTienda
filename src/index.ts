import { App } from './app'

// * Index App

async function main() {
    const app = new App()
    await app.listen()
}

main()