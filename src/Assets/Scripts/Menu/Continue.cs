using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Continue : MonoBehaviour {

    public GameObject ContinueButton;
    public GameObject ExitButton;
    public void ContinueGame()
    {
        Time.timeScale = 1;
        ContinueButton.SetActive(false);
        ExitButton.SetActive(false);
    }
}
