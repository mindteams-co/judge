import pandas as pd
from sklearn.metrics import f1_score


def score_task(input_df: pd.DataFrame, answer: pd.DataFrame) -> float:
    f1 = f1_score(answer, input_df, average='weighted')
    return f1

def score(input_csv_path: str, answer_csv_path: str) -> float:
    answer_df = pd.read_csv(answer_csv_path).set_index('Name').sort_index()
    input_df = pd.read_csv(input_csv_path).set_index('Name').sort_index()
    return score_task(input_df, answer_df)
