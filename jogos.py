import random

# ==================#
# 1 - Jogo da velha #
# ==================#

def print_tabuleiro(tabuleiro):
    for linha in tabuleiro:
        print(" | ".join(linha))
        print("-" * 5)

def verificar_vitoria(tabuleiro, jogador):
    for i in range(3):
        if all([tabuleiro[i][j] == jogador for j in range(3)]) or \
            all([tabuleiro[j][i] == jogador for j in range(3)]):
            return True
        if tabuleiro[0][0] == tabuleiro[1][1] == tabuleiro[2][2] == jogador or \
            tabuleiro[0][2] == tabuleiro [1][1] == tabuleiro[2][0] == jogador:
            return True
        return False

def jogo_da_velha():
    tabuleiro = [[" " for _ in range(3)] for _ in range(3)]
    jogador_atual = "X"

    for rodada in range(9):
        print_tabuleiro(tabuleiro)
        print(f"Vez do jogador {jogador_atual}")
        try:
            linha = int(input("Escolha a linha(0,1,2)"))
            coluna = int(input("Escolha a coluna(0,1,2)"))
        except ValueError:
            print("Entrada inválida, tente novamente")
            continue

        if linha not in range(3) or coluna not in range(3):
            print("Posição fora do tabuleiro,tente outra vez")
            continue

        if tabuleiro[linha][coluna] != " ":
            print("Posição ocupada, tente outra")
            continue

        tabuleiro[linha][coluna] = jogador_atual

        if verificar_vitoria(tabuleiro, jogador_atual):
            print_tabuleiro(tabuleiro)
            print(f"Jogador {jogador_atual} venceu, parabéns")
            return

        jogador_atual = "O" if jogador_atual == "X" else "X"

    print_tabuleiro(tabuleiro)
    print("Empate")

# ==========================#
# 2 - Pedra, Papel, Tesoura #
# ==========================#

def pedra_papel_tesoura():
    opcoes = ["pedra", "papel", "tesoura"]
    print("\n=== PEDRA, PAPEL, TESOURA ===")
    jogador = input("Escolha (pedra/papel/tesoura): ").lower()
    if jogador not in opcoes:
        print("Escolha inválida!")
        return
    pc = random.choice(opcoes)
    print(f"Computador escolheu: {pc}")

    if jogador == pc:
        print("Empate!")
    elif (jogador == "pedra" and pc == "tesoura") or \
         (jogador == "papel" and pc == "pedra") or \
         (jogador == "tesoura" and pc == "papel"):
        print("Você ganhou!")
    else:
        print("Computador ganhou!")

# ==========================#
# 3 - Jodo do Dado #
# ==========================#

def jogar_dado():
    return random.randint(1, 6)

def jogo_do_dado():
    print("\n=== JOGO DO DADO ===")
    pontos_jogador = 0
    pontos_computador = 0

    for rodada in range(1, 4):
        input(f"\nPressione ENTER para jogar o dado da rodada {rodada}...")

        dado_jogador = jogar_dado()
        dado_computador = jogar_dado()

        print(f"Você tirou: {dado_jogador}")
        print(f"Computador tirou: {dado_computador}")

        if dado_jogador > dado_computador:
            print("✅ Você venceu a rodada!")
            pontos_jogador += 1
        elif dado_computador > dado_jogador:
            print("❌ Computador venceu a rodada!")
            pontos_computador += 1
        else:
            print("🤝 Empate!")

    print("\n===== PLACAR FINAL =====")
    print(f"Você: {pontos_jogador}")
    print(f"Computador: {pontos_computador}")


    if pontos_jogador > pontos_computador:
        print("Parabéns, você venceu o jogo!")
    elif pontos_computador > pontos_jogador:
        print("O computador venceu o jogo :( ")
    else:
        print(" O jogo terminou empatado!")

jogo_do_dado()       

# ===============#
# MENU PRINCIPAL #
# ===============#

def menu():
    while True:
        print("\n=== MENU DE JOGOS ===")
        print("1 - Jogo da Velha")
        print("2 - Pedra, Papel, Tesoura")
        print("3 - Jogo do Dado")
        print("4 - Sair")
        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            jogo_da_velha()
        elif opcao == "2":
            pedra_papel_tesoura()
        elif opcao == "3":
            jogo_do_dado()
        elif opcao == "4":
            print("Saindo...")
            break
        else:
            print("Opção inválida!")

# Iniciar o programa
if __name__ == "__main__":
    menu()



