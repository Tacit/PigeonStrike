using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class KeysHandlerScript : MonoBehaviour {

    public GameObject ContinueButton;
    public GameObject ExitButton;
    // Use this for initialization
    void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
        bool isCanceled = Input.GetButtonDown("Cancel");

        if(isCanceled)
        {
            ContinueButton.SetActive(true);
            ExitButton.SetActive(true);
            Time.timeScale = 0;
        }
	}
}
