# Simple face matching placeholder
# In a real implementation, use face_recognition library

import sys
import os

def match_faces(registered_path, captured_path):
    # Placeholder: always return match for demo
    # Replace with actual face recognition logic
    return True

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python face_match.py <registered_face> <captured_face>")
        sys.exit(1)

    registered = sys.argv[1]
    captured = sys.argv[2]

    if match_faces(registered, captured):
        print("match")
    else:
        print("no_match")
