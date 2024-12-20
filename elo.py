


class Player:
    def __init__(self, name:, elo):
        self.name = name
        self.elo = elo

    def prettyPrint(self):
        return f"{self.name} ({self.elo})"
    
    def getElo(self):
        return self.elo

    def getName(self):
        return self.name

    def setElo(self, elo):
        self.elo = elo
    


def expectedScore(player1, player2):
    return 1 / (1 + 10 ** ((player2.getElo() - player1.getElo()) / 400))

def updateElo(player1, player2, score1, score2):
    expected1 = expectedScore(player1, player2)
    expected2 = expectedScore(player2, player1)
    player1.setElo(player1.getElo() + 32 * (score1 - expected1))
    player2.setElo(player2.getElo() + 32 * (score2 - expected2))

