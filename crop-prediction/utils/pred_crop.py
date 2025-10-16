from model import net
import torch
import pickle
import numpy as np


def predict_crop(nitrogen, phosphorous, potassium, temperature, humidity, ph, rainfall):
    return get_prediction((nitrogen, phosphorous, potassium, temperature, humidity, ph, rainfall))


def get_prediction(x):
    model = net.Net_64_128_64(7, 22)
    model.load_state_dict(torch.load('model/baseline/baseline.hdf5', map_location=torch.device('cpu'), weights_only=True))
    model.eval()  # Set to evaluation mode
    
    normalization = np.load("model/normalization/normalization.npz")
    mean = normalization["mean"]
    std = normalization["std"]
    print(x)
    
    input_vector = torch.tensor(x, dtype=torch.float32)
    mean_tensor = torch.tensor(mean, dtype=torch.float32)
    std_tensor = torch.tensor(std, dtype=torch.float32)
    input_vector = (input_vector - mean_tensor) / std_tensor

    # Run prediction without gradient computation
    with torch.no_grad():
        prediction = model(input_vector)

    with open("model/pkl_files/encoder.pkl", "rb") as file:
        encoder = pickle.load(file)

    predicted = prediction.argmax().item()
    encoded_labels = encoder.inverse_transform(np.array([predicted]))

    # DEBUG
    # print("Encoded labels:", encoded_labels)

    return encoded_labels
