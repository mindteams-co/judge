import pandas as pd
from sklearn.metrics import f1_score


def score_task1(input_df: pd.DataFrame, answer: pd.DataFrame) -> float:
    columns_from_other_tasks = ['task2_class', 'tech_cond', 'standard']
    y = answer[answer.columns.difference(columns_from_other_tasks)]
    preds = input_df[input_df.columns.difference(columns_from_other_tasks)]
    f1 = f1_score(y, preds, average='weighted')
    return f1


def score_task2(input_df: pd.DataFrame, answer: pd.DataFrame) -> float:
    preds = input_df['task2_class']
    y = answer['task2_class']
    f1 = f1_score(y, preds, average='weighted')
    return f1


def score_task3(input_df: pd.DataFrame, answer: pd.DataFrame) -> float:
    y = answer[['tech_cond', 'standard']]
    preds = input_df[['tech_cond', 'standard']]
    score_tech = f1_score(y['tech_cond'], preds['tech_cond'], average='weighted')
    score_inter = f1_score(y['standard'], preds['standard'], average='weighted')
    return (score_tech + score_inter)/2


def score(input_csv_path: str, answer_csv_path: str, task_weights: dict) -> float:
    answer_df = pd.read_csv(answer_csv_path).set_index('filename').sort_index()
    input_df = pd.read_csv(input_csv_path).set_index('filename').sort_index()
    task1 = score_task1(input_df, answer_df)
    task2 = score_task2(input_df, answer_df)
    task3 = score_task3(input_df, answer_df)
    final_score = (task1 * task_weights['task1'] +
                   task2 * task_weights['task2'] +
                   task3 * task_weights['task3'])
    return final_score
