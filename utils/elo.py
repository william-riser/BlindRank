import math

class Player:
    def __init__(self, name, elo):
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
    

# Expected score based on elo difference
def expectedScore(player1, player2):
    return 1 / (1 + 10 ** ((player2.getElo() - player1.getElo()) / 400))

# Update elo scores
def updateElo(winner, loser):
    k = 32
    winnerNewElo = winner.getElo() + k * (1 - expectedScore(winner, loser))
    loserNewElo = loser.getElo() + k * (0 - expectedScore(loser, winner))
    winner.setElo(math.ceil(winnerNewElo))
    loser.setElo(math.ceil(loserNewElo))
