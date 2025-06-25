import pickle
model_filename = 'models/placement_predictor.pkl'  # Update this path
with open(model_filename, 'rb') as file:
    model = pickle.load(file)
print(model.score())